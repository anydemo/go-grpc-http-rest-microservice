/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


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
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoReadAll = new grpcWeb.AbstractClientBase.MethodInfo(
    ReadAllResponse,
    (request: ReadAllRequest) => {
      return request.serializeBinary();
    },
    ReadAllResponse.deserializeBinary
  );

  readAll(
    request: ReadAllRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ReadAllResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ToDoService/ReadAll',
      request,
      metadata || {},
      this.methodInfoReadAll,
      callback);
  }

  methodInfoCreate = new grpcWeb.AbstractClientBase.MethodInfo(
    CreateResponse,
    (request: CreateRequest) => {
      return request.serializeBinary();
    },
    CreateResponse.deserializeBinary
  );

  create(
    request: CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: CreateResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ToDoService/Create',
      request,
      metadata || {},
      this.methodInfoCreate,
      callback);
  }

  methodInfoRead = new grpcWeb.AbstractClientBase.MethodInfo(
    ReadResponse,
    (request: ReadRequest) => {
      return request.serializeBinary();
    },
    ReadResponse.deserializeBinary
  );

  read(
    request: ReadRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: ReadResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ToDoService/Read',
      request,
      metadata || {},
      this.methodInfoRead,
      callback);
  }

  methodInfoUpdate = new grpcWeb.AbstractClientBase.MethodInfo(
    UpdateResponse,
    (request: UpdateRequest) => {
      return request.serializeBinary();
    },
    UpdateResponse.deserializeBinary
  );

  update(
    request: UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UpdateResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ToDoService/Update',
      request,
      metadata || {},
      this.methodInfoUpdate,
      callback);
  }

  methodInfoDelete = new grpcWeb.AbstractClientBase.MethodInfo(
    DeleteResponse,
    (request: DeleteRequest) => {
      return request.serializeBinary();
    },
    DeleteResponse.deserializeBinary
  );

  delete(
    request: DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: DeleteResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/v1.ToDoService/Delete',
      request,
      metadata || {},
      this.methodInfoDelete,
      callback);
  }

}

