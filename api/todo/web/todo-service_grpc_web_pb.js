/**
 * @fileoverview gRPC-Web generated client stub for v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js')

var google_api_annotations_pb = require('./google/api/annotations_pb.js')

var protoc$gen$swagger_options_annotations_pb = require('./protoc-gen-swagger/options/annotations_pb.js')
const proto = {};
proto.v1 = require('./todo-service_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.v1.ToDoServiceClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.v1.ToDoServicePromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.ReadAllRequest,
 *   !proto.v1.ReadAllResponse>}
 */
const methodDescriptor_ToDoService_ReadAll = new grpc.web.MethodDescriptor(
  '/v1.ToDoService/ReadAll',
  grpc.web.MethodType.UNARY,
  proto.v1.ReadAllRequest,
  proto.v1.ReadAllResponse,
  /**
   * @param {!proto.v1.ReadAllRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ReadAllResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ReadAllRequest,
 *   !proto.v1.ReadAllResponse>}
 */
const methodInfo_ToDoService_ReadAll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.ReadAllResponse,
  /**
   * @param {!proto.v1.ReadAllRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ReadAllResponse.deserializeBinary
);


/**
 * @param {!proto.v1.ReadAllRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.ReadAllResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ReadAllResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.ToDoServiceClient.prototype.readAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.ToDoService/ReadAll',
      request,
      metadata || {},
      methodDescriptor_ToDoService_ReadAll,
      callback);
};


/**
 * @param {!proto.v1.ReadAllRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.ReadAllResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.ToDoServicePromiseClient.prototype.readAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/v1.ToDoService/ReadAll',
      request,
      metadata || {},
      methodDescriptor_ToDoService_ReadAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.CreateRequest,
 *   !proto.v1.CreateResponse>}
 */
const methodDescriptor_ToDoService_Create = new grpc.web.MethodDescriptor(
  '/v1.ToDoService/Create',
  grpc.web.MethodType.UNARY,
  proto.v1.CreateRequest,
  proto.v1.CreateResponse,
  /**
   * @param {!proto.v1.CreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.CreateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.CreateRequest,
 *   !proto.v1.CreateResponse>}
 */
const methodInfo_ToDoService_Create = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.CreateResponse,
  /**
   * @param {!proto.v1.CreateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.CreateResponse.deserializeBinary
);


/**
 * @param {!proto.v1.CreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.CreateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.CreateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.ToDoServiceClient.prototype.create =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.ToDoService/Create',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Create,
      callback);
};


/**
 * @param {!proto.v1.CreateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.CreateResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.ToDoServicePromiseClient.prototype.create =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/v1.ToDoService/Create',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Create);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.ReadRequest,
 *   !proto.v1.ReadResponse>}
 */
const methodDescriptor_ToDoService_Read = new grpc.web.MethodDescriptor(
  '/v1.ToDoService/Read',
  grpc.web.MethodType.UNARY,
  proto.v1.ReadRequest,
  proto.v1.ReadResponse,
  /**
   * @param {!proto.v1.ReadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ReadResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.ReadRequest,
 *   !proto.v1.ReadResponse>}
 */
const methodInfo_ToDoService_Read = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.ReadResponse,
  /**
   * @param {!proto.v1.ReadRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.ReadResponse.deserializeBinary
);


/**
 * @param {!proto.v1.ReadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.ReadResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.ReadResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.ToDoServiceClient.prototype.read =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.ToDoService/Read',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Read,
      callback);
};


/**
 * @param {!proto.v1.ReadRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.ReadResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.ToDoServicePromiseClient.prototype.read =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/v1.ToDoService/Read',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Read);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.UpdateRequest,
 *   !proto.v1.UpdateResponse>}
 */
const methodDescriptor_ToDoService_Update = new grpc.web.MethodDescriptor(
  '/v1.ToDoService/Update',
  grpc.web.MethodType.UNARY,
  proto.v1.UpdateRequest,
  proto.v1.UpdateResponse,
  /**
   * @param {!proto.v1.UpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.UpdateResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.UpdateRequest,
 *   !proto.v1.UpdateResponse>}
 */
const methodInfo_ToDoService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.UpdateResponse,
  /**
   * @param {!proto.v1.UpdateRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.UpdateResponse.deserializeBinary
);


/**
 * @param {!proto.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.UpdateResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.UpdateResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.ToDoServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.ToDoService/Update',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Update,
      callback);
};


/**
 * @param {!proto.v1.UpdateRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.UpdateResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.ToDoServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/v1.ToDoService/Update',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.v1.DeleteRequest,
 *   !proto.v1.DeleteResponse>}
 */
const methodDescriptor_ToDoService_Delete = new grpc.web.MethodDescriptor(
  '/v1.ToDoService/Delete',
  grpc.web.MethodType.UNARY,
  proto.v1.DeleteRequest,
  proto.v1.DeleteResponse,
  /**
   * @param {!proto.v1.DeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.DeleteResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.v1.DeleteRequest,
 *   !proto.v1.DeleteResponse>}
 */
const methodInfo_ToDoService_Delete = new grpc.web.AbstractClientBase.MethodInfo(
  proto.v1.DeleteResponse,
  /**
   * @param {!proto.v1.DeleteRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.v1.DeleteResponse.deserializeBinary
);


/**
 * @param {!proto.v1.DeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.v1.DeleteResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.v1.DeleteResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.v1.ToDoServiceClient.prototype.delete =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/v1.ToDoService/Delete',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Delete,
      callback);
};


/**
 * @param {!proto.v1.DeleteRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.v1.DeleteResponse>}
 *     A native promise that resolves to the response
 */
proto.v1.ToDoServicePromiseClient.prototype.delete =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/v1.ToDoService/Delete',
      request,
      metadata || {},
      methodDescriptor_ToDoService_Delete);
};


module.exports = proto.v1;

