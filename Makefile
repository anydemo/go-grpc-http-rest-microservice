PACKAGE  = grpc-rest-svr
DATE    ?= $(shell date +%FT%T%z)
VERSION ?= $(shell git describe --tags --always --dirty --match=v* 2> /dev/null || \
			cat $(CURDIR)/.version 2> /dev/null || echo v0)
PKGS     = $(or $(PKG),$(shell env GO111MODULE=on $(GO) list ./...))
TESTPKGS = $(shell env GO111MODULE=on $(GO) list -f '{{ if or .TestGoFiles .XTestGoFiles }}{{ .ImportPath }}{{ end }}' $(PKGS))
BIN      = $(CURDIR)/bin

GO      = go
TIMEOUT = 15
V = 0
Q = $(if $(filter 1,$V),,@)
M = $(shell printf "\033[34;1m▶\033[0m")

PKG ?= $(shell $(GO) list ./... | grep -v /vendor/)
export GO111MODULE=on
export GOPROXY=${GOPROXY:-https://goproxy.cn,,direct}

.PHONY: all
all: fmt lint ; $(info $(M) building executable…) @ ## Build program binary
	$Q $(GO) build \
		-tags release \
		-ldflags '-X $(PACKAGE)/cmd.Version=$(VERSION) -X $(PACKAGE)/cmd.BuildDate=$(DATE)' \
		-o $(BIN)/$(PACKAGE) cmd/server/*.go

# Tools
$(BIN):
	@mkdir -p $@
$(BIN)/%: | $(BIN) ; $(info $(M) building $(REPOSITORY)…)
	$Q GOBIN=$(BIN) $(GO) get $(REPOSITORY) \
		|| ret=$$?; \
		$(GO) mod tidy; \
		exit $$ret

GOLINT = $(BIN)/golint
$(BIN)/golint: REPOSITORY=golang.org/x/lint/golint

GOCOVMERGE = $(BIN)/gocovmerge
$(BIN)/gocovmerge: REPOSITORY=github.com/wadey/gocovmerge

GOCOV = $(BIN)/gocov
$(BIN)/gocov: REPOSITORY=github.com/axw/gocov/gocov

GOCOVXML = $(BIN)/gocov-xml
$(BIN)/gocov-xml: REPOSITORY=github.com/AlekSi/gocov-xml

GO2XUNIT = $(BIN)/go2xunit
$(BIN)/go2xunit: REPOSITORY=github.com/tebeka/go2xunit

ProtocGenGo = $(BIN)/protoc-gen-go
$(BIN)/protoc-gen-go: REPOSITORY=github.com/golang/protobuf/protoc-gen-go

Protoc = $(BIN)/protoc
$(BIN)/protoc: REPOSITORY=https://github.com/protocolbuffers/protobuf/releases

ProtocGenGrpcGateway = $(BIN)/protoc-gen-grpc-gateway
$(BIN)/protoc-gen-grpc-gateway: REPOSITORY=github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway

ProtocGenSwagger = $(BIN)/protoc-gen-swagger
$(BIN)/protoc-gen-swagger: REPOSITORY=github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger

ProtocGenWeb = $(BIN)/protoc-gen-grpc-web
$(BIN)/protoc-gen-grpc-web: REPOSITORY=https://github.com/grpc/grpc-web/releases

# Tests
TEST_TARGETS := test-default test-bench test-short test-verbose test-race
.PHONY: $(TEST_TARGETS) test-xml check test tests
test-bench:   ARGS=-run=__absolutelynothing__ -bench=. ## Run benchmarks
test-short:   ARGS=-short        ## Run only short tests
test-verbose: ARGS=-v            ## Run tests in verbose mode with coverage reporting
test-race:    ARGS=-race         ## Run tests with race detector
$(TEST_TARGETS): NAME=$(MAKECMDGOALS:test-%=%)
$(TEST_TARGETS): test
check test tests: fmt lint ; $(info $(M) running $(NAME:%=% )tests…) @ ## Run tests
	$Q $(GO) test -timeout $(TIMEOUT)s $(ARGS) $(TESTPKGS)

test-xml: fmt lint | $(GO2XUNIT) ; $(info $(M) running $(NAME:%=% )tests…) @ ## Run tests with xUnit output
	$Q mkdir -p test
	$Q 2>&1 $(GO) test -timeout 20s -v $(TESTPKGS) | tee test/tests.output
	$(GO2XUNIT) -fail -input test/tests.output -output test/tests.xml

COVERAGE_MODE = atomic
COVERAGE_PROFILE = $(COVERAGE_DIR)/profile.out
COVERAGE_XML = $(COVERAGE_DIR)/coverage.xml
COVERAGE_HTML = $(COVERAGE_DIR)/index.html
.PHONY: test-coverage test-coverage-tools
test-coverage-tools: | $(GOCOVMERGE) $(GOCOV) $(GOCOVXML)
test-coverage: COVERAGE_DIR := $(CURDIR)/test/coverage.$(shell date -u +"%Y-%m-%dT%H:%M:%SZ")
test-coverage: fmt lint test-coverage-tools ; $(info $(M) running coverage tests…) @ ## Run coverage tests
	$Q mkdir -p $(COVERAGE_DIR)/coverage
	$Q for pkg in $(TESTPKGS); do \
		$(GO) test \
			-coverpkg=$$($(GO) list -f '{{ join .Deps "\n" }}' $$pkg | \
					grep '^$(PACKAGE)/' | \
					tr '\n' ',')$$pkg \
			-covermode=$(COVERAGE_MODE) \
			-coverprofile="$(COVERAGE_DIR)/coverage/`echo $$pkg | tr "/" "-"`.cover" $$pkg ;\
	 done
	$Q $(GOCOVMERGE) $(COVERAGE_DIR)/coverage/*.cover > $(COVERAGE_PROFILE)
	$Q $(GO) tool cover -html=$(COVERAGE_PROFILE) -o $(COVERAGE_HTML)
	$Q $(GOCOV) convert $(COVERAGE_PROFILE) | $(GOCOVXML) > $(COVERAGE_XML)

.PHONY: lint
lint: | $(GOLINT) ; $(info $(M) running golint…) @ ## Run golint
	$Q $(GOLINT) -set_exit_status $(PKGS)

.PHONY: vendor
vendor:
	$(GO) mod vendor
.PHONY: fmt
fmt: ; $(info $(M) running gofmt…) @ ## Run gofmt on all source files
	$Q $(GO) fmt ./...

# GO MOD

.PHONY: get
get: ## go mod get
	@$(GO) $@ -v ${ARGS} ${PKG}

.PHONY: getu
getu: ## go mod get -u
	@$(GO) $@ -v -u ${ARGS} ${PKG}

# Misc

.PHONY: clean
clean: ; $(info $(M) cleaning…)	@ ## Cleanup everything
	@rm -rf test/tests.* test/coverage.*
	@rm -rf data/*

.PHONY: help
help:
	@grep -E '^[ a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | \
		awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: gen
gen: | $(ProtocGenGo) $(ProtocGenGrpcGateway) $(ProtocGenSwagger) $(ProtocGenWeb)
	$Q mkdir -p pkg/todo/api/v1
	$Q mkdir -p api/todo/swagger/v1
	$Q export PATH=$(BIN):${PATH}
	# gen todo
	$Q $(Protoc) --proto_path=api/todo/proto/v1 --proto_path=third_party --go_out=plugins=grpc:pkg/todo/api/v1 todo-service.proto
	$Q $(Protoc) --proto_path=api/todo/proto/v1 --proto_path=third_party --grpc-gateway_out=logtostderr=true:pkg/todo/api/v1 todo-service.proto
	$Q $(Protoc) --proto_path=api/todo/proto/v1 --proto_path=third_party --swagger_out=logtostderr=true:api/todo/swagger/v1 todo-service.proto

	$Q $(Protoc) --proto_path=api/todo/proto/v1 --proto_path=third_party --js_out=import_style=commonjs,binary:api/todo/web --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:api/todo/web todo-service.proto
	$Q $(Protoc) --proto_path=api/todo/proto/v1 --proto_path=third_party --grpc-web_out=import_style=typescript,mode=grpcwebtext:api/todo/web todo-service.proto

# $Q mkdir -p client
# $Q $(Protoc) --proto_path=api/proto/v1 --proto_path=third_party --js_out=import_style=typescript:client --grpc-web_out=import_style=commonjs,mode=grpcwebtext:client todo-service.proto

.PHONY: version
version:
	@echo $(VERSION)

.PHONY: discovery
discovery:
	docker run --rm --network host -p 8500:8500 consul:1.5

.PHONY: todo-server
todo-server:
	$Q $(GO) run cmd/todo-server/*.go -grpc-port=9090 -http-port=8080 -db-host=localhost:3306 -db-user=root -db-password=password -db-schema=todo -log-level=-1 -log-time-format=2006-01-02T15:04:05.999999999Z07:00

.PHONY: todo-client
todo-client:
	$Q $(GO) run cmd/todo-client-grpc/main.go -server=127.0.0.1:9090
	$Q $(GO) run cmd/todo-client-rest/main.go -server=http://localhost:8080

.PHONY: todo-client-discovery
todo-client-discovery:
	$Q $(GO) run cmd/todo-client-grpc/main.go -server=consul://127.0.0.1:8500/todo_server_grpc

.PHONY: blog-server
blog-server:
	$Q $(GO) run cmd/blog-server/*.go -grpc-port=9090 -http-port=8080 -db-addr=postgres://user:password@localhost:5432/weibo?sslmode=disable -log-level=-1 -log-time-format=2006-01-02T15:04:05.999999999Z07:00

.PHONY: init
init:
	$Q docker-compose exec postgres psql -U user -d weibo -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
	$Q docker-compose exec pg_master psql -U user -d weibo -c 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'

.PHONY: consul
consul: 
	./bin/consul agent -server -data-dir .dev/consul/data -bootstrap -ui-dir=.dev/consul/data/consul-ui/dist -client=0.0.0.0 -syslog
