rm -rf third_party
mkdir -p bin third_party "third_party/protoc-gen-swagger/options"

output_dir="${PWD}/bin"
protoc_name="protoc-3.11.4-osx-x86_64"
protoc_download_path="$output_dir/${protoc_name}.zip"
third_party="third_party"

protoc_unpack_path="$output_dir/protoc-3.11.4-osx-x86_64"

wget -O "$protoc_download_path" -c 'https://github.com/protocolbuffers/protobuf/releases/download/v3.11.4/protoc-3.11.4-osx-x86_64.zip'
unzip -u "$protoc_download_path" -d "$protoc_unpack_path"

ln -s "$protoc_unpack_path/bin/protoc" "${output_dir}/protoc"

cp -r "$protoc_unpack_path/include/google" "$third_party/google"

gateway_name="grpc-gateway-v1.14.3"
gateway_download_path="$output_dir/${gateway_name}.zip"
gateway_unpack_path="$output_dir/${gateway_name}"
wget -O "$gateway_download_path" -c "https://github.com/grpc-ecosystem/grpc-gateway/archive/v1.14.3.zip"
unzip -u "$gateway_download_path" -d "$gateway_unpack_path"

cp -r "$gateway_unpack_path/grpc-gateway-1.14.3/third_party/googleapis/google/"{api,rpc} "$third_party/google"
cp -r "$gateway_unpack_path/grpc-gateway-1.14.3/protoc-gen-swagger/options/"*.proto "$third_party/protoc-gen-swagger/options/"
