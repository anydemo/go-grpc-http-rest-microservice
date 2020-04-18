import * as grpcWeb from 'grpc-web';

import * as google_protobuf_timestamp_pb from 'google-protobuf/google/protobuf/timestamp_pb';
import * as google_api_annotations_pb from './google/api/annotations_pb';
import * as protoc$gen$swagger_options_annotations_pb from './protoc-gen-swagger/options/annotations_pb';

import {
  CreateRequest,
  CreateResponse,
  DeleteRequest,
  DeleteResponse,
  ReadAllRequest,
  ReadAllResponse,
  ReadRequest,
  ReadResponse,
  UpdateRequest,
  UpdateResponse} from './todo-service_pb';

export class ToDoServiceClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  readAll(
    request: ReadAllRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ReadAllResponse) => void
  ): grpcWeb.ClientReadableStream<ReadAllResponse>;

  create(
    request: CreateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: CreateResponse) => void
  ): grpcWeb.ClientReadableStream<CreateResponse>;

  read(
    request: ReadRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: ReadResponse) => void
  ): grpcWeb.ClientReadableStream<ReadResponse>;

  update(
    request: UpdateRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: UpdateResponse) => void
  ): grpcWeb.ClientReadableStream<UpdateResponse>;

  delete(
    request: DeleteRequest,
    metadata: grpcWeb.Metadata | undefined,
    callback: (err: grpcWeb.Error,
               response: DeleteResponse) => void
  ): grpcWeb.ClientReadableStream<DeleteResponse>;

}

export class ToDoServicePromiseClient {
  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; });

  readAll(
    request: ReadAllRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ReadAllResponse>;

  create(
    request: CreateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<CreateResponse>;

  read(
    request: ReadRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<ReadResponse>;

  update(
    request: UpdateRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<UpdateResponse>;

  delete(
    request: DeleteRequest,
    metadata?: grpcWeb.Metadata
  ): Promise<DeleteResponse>;

}

