
<!-- markdownlint-disable -->
<!-- proselint-disable -->
# Qlik Associative Engine API

_Qlik Associative Engine API for version 12.268.0._

[Qlik Associative Engine API specification](./qlik-associative-engine-api.json)


## Paths

### `GET /health`

Checks if the Engine service is healthy.

* If response code 200 is returned; engine is healthy and ready to serve requests.
* If the setting `EnableLameDuckHealthCheck` is set to 1, response code 429 is returned
if the engine is alive but too busy to serve new requests.
* Other response code means that Engine is not healthy.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |

### `GET /healthcheck`

Checks if the Engine service is healthy and returns basic status information about the running instance.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Locked |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [HealthcheckStatus](#healthcheckstatus) |

### `GET /sessions`

Returns a list of active websocket sessions in engine instance.

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | array&lt;[Session](#session)> |

### `POST /v1/apps`

Creates a new app.

Required permissions: [`create`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `attr` | body | [CreateApp](#createapp) | true | Attributes that the user want to set in new app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `POST /v1/apps/import`

Imports an app to the system.
<div class=note>This operation in autoreplace mode is supported only in EFE mode.</div>

Required permissions: [`import`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Consumes | application/octet-stream |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `filedata` | body | [FileData](#filedata) | true | Path of the source app. |
| `name` | query | string | false | The name of the target app. |
| `mode` | query | string | false | The import mode. In `new` mode (default), the source app will be imported as a new app with generated attributes. In `autoreplace` mode, the attributes from the source app will be retained and imported with the app. The app-id is extracted from the source app and used as the target app-id. If the app exists, it will be replaced. Approved objects in the target app which are not availble in the source app will be removed. Non-approved objects in the target app will not be removed.  One of:<br/>&bull; NEW<br/>&bull; AUTOREPLACE |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `GET /v1/apps/privileges`

Gets the app privileges for the current user, such as create app and import app. Empty means that the current user has no app privileges.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

_No parameters_


**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | array&lt;string> |

### `GET /v1/apps/{appId}`

Retrives information for a specific app.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `DELETE /v1/apps/{appId}`

Deletes a specific app.

Required permissions: [`delete`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |

### `PUT /v1/apps/{appId}`

Updates the information for a specific app.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `update` | body | [UpdateApp](#updateapp) | true | Attributes that user want to set. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `POST /v1/apps/{appId}/copy`

Copies a specific app.

Required permissions: [`duplicate`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `dstUpdate` | body | [UpdateApp](#updateapp) | true | Attributes that should be set in the copy. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `GET /v1/apps/{appId}/data/metadata`

Retrieves the data model and reload statistics metadata of an app.
<div class=note>An empty metadata structure is returned if the metadata is not available in the app..</div>

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [DataModelMetadata](#datamodelmetadata) |

### `GET /v1/apps/{appId}/media/files/{path}`

Get media content from file.
Returns a stream of bytes containing the media file content on success, or error if file is not found.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/octet-stream |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | binary |
| `404` | Not Found | _No schema_ |

### `PUT /v1/apps/{appId}/media/files/{path}`

Stores the media content file.
Returns OK if the bytes containing the media file content was succesfully stored, or error in case of failure or lack of permission.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Consumes | application/octet-stream |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |
| `filedata` | body | [FileData](#filedata) | true | _No description._ |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |
| `404` | Not Found | _No schema_ |

### `DELETE /v1/apps/{appId}/media/files/{path}`

Deletes a media content file or complete directory.
Returns OK if the bytes containing the media file (or the complete content of a directory) was succesfully deleted, or error in case of failure or lack of permission.

Required permissions: [`update`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | Path to file content. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | _No schema_ |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/list/{path}`

List media content.
Returns a JSON formatted array of strings describing the available media content or error if the optional path supplied is not found.

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |
| `path` | path | string | true | The path to sub folder with static content, path is relative to the root folder. Use empty path to access the root folder. |
| `show` | query | string | false | Optional. List output can include files and folders in different ways:<br/>&bull; Not recursive, default if show option is not supplied or incorrectly specified, results in output with files and empty directories for the path specified only.<br/>&bull; Recursive(r), use ?show=r or ?show=recursive, results in a recursive output with files, all empty folders are excluded.<br/>&bull; All(a), use ?show=a or ?show=all, results in a recursive output with files and empty directories. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | array&lt;string> |
| `404` | Not Found | _No schema_ |

### `GET /v1/apps/{appId}/media/thumbnail`

Get media content from file currently used as application thumbnail.
Returns a stream of bytes containing the media file content on success, or error if file is not found.
<div class=note>The image selected as thumbnail is only updated when application is saved.</div>

Required permissions: [`read`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/octet-stream |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Unique application identifier. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | binary |
| `404` | Not Found | _No schema_ |

### `PUT /v1/apps/{appId}/publish`

Publish a specific app.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |
| `publish` | body | [PublishApp](#publishapp) | false | Publish information for the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

### `PUT /v1/apps/{appId}/unpublish`

Reverts a published app to a private app.

Required permissions: [`publish`](https://core.qlik.com/services/qix-engine/access-control/#actions)

| Metadata | Value |
| -------- | ----- |
| Stability Index | Experimental |
| Produces | application/json |

**Parameters**

| Parameter | In | Type | Mandatory | Description |
| --------- | -- | ---- | --------- | ----------- |
| `appId` | path | string | true | Identifier of the app. |

**Responses**

| Status | Description | Type |
| ------ | ----------- | ---- |
| `200` | OK | [NxApp](#nxapp) |

## Definitions

### `HealthcheckStatus`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `version` | string | _No description._ |
| `started` | string | _No description._ |
| `mem` | [MemoryUsage](#memoryusage) | _No description._ |
| `cpu` | [CPUUsage](#cpuusage) | _No description._ |
| `session` | [SessionUsage](#sessionusage) | _No description._ |
| `apps` | [AppUsage](#appusage) | _No description._ |
| `users` | [UserUsage](#userusage) | _No description._ |
| `cache` | [CacheUsage](#cacheusage) | _No description._ |
| `saturated` | boolean | _No description._ |

### `MemoryUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `committed` | number | _No description._ |
| `allocated` | number | _No description._ |
| `free` | number | _No description._ |

### `CPUUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `total` | number | _No description._ |

### `SessionUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active` | integer | _No description._ |
| `total` | integer | _No description._ |

### `AppUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active_docs` | array&lt;string> | _No description._ |
| `loaded_docs` | array&lt;string> | _No description._ |
| `in_memory_docs` | array&lt;string> | _No description._ |
| `calls` | integer | _No description._ |
| `selections` | integer | _No description._ |

### `UserUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `active` | integer | _No description._ |
| `total` | integer | _No description._ |

### `CacheUsage`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `hits` | integer | _No description._ |
| `lookups` | integer | _No description._ |
| `added` | integer | _No description._ |
| `replaced` | integer | _No description._ |
| `bytes_added` | integer | _No description._ |

### `Session`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `sessionid` | string | Session ID provided by client. |
| `userid` | string | The ID of the user that created the session. |
| `appid` | string | The ID of the app, if no app is opened on socket it will be empty. |
| `tenantid` | string | The ID of the tenant associated with the user, only applicable in multi-tenant environments. |
| `ttl` | integer | Configured TTL (time to live), the time a session is kept alive with no connected client. 0 by default. |
| `state` | string | The state of the session. To be available it needs to be active. <br/>&bull; active: The session is active and available.<br/>&bull; stalled: The session has stopped and is not available. |

### `CreateApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [AppAttributes](#appattributes) | Attributes used when creating an application |

### `AppAttributes`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | The name (title) of the application |
| `description` | string | The description of the application |

### `NxApp`

Application attributes and user privileges.

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [NxAttributes](#nxattributes) | Application attributes. |
| `privileges` | array&lt;string> | Application privileges. Hints to the client what actions the user are allowed to perform. Could be any of:<br/>&bull; read<br/>&bull; create<br/>&bull; update<br/>&bull; delete<br/>&bull; reload<br/>&bull; import<br/>&bull; publish<br/>&bull; duplicate<br/>&bull; export<br/>&bull; exportdata |
| `create` | array&lt;[NxAppCreatePrivileges](#nxappcreateprivileges)> | Object create privileges. Hints to the client what type of objects the user is allowed to create. |

### `NxAttributes`

App attributes. This structure can also contain extra user defined attributes.

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `id` | string | The App ID. |
| `name` | string | App name. |
| `description` | string | App description. |
| `thumbnail` | string | App thumbnail. |
| `lastReloadTime` | string | Date and time of the last reload of the app. |
| `createdDate` | string | The date and time when the app was created. |
| `modifiedDate` | string | The date and time when the app was modified. |
| `owner` | string | The owner of the app. |
| `dynamicColor` | string | The dynamic color of the app. |
| `published` | boolean | True if the app is published, false if not. |
| `publishTime` | string | The date and time when the app was published. Empty if unpublished. |
| `custom` | [JsonObject](#jsonobject) | Custom attributes. |

### `JsonObject`

Contains dynamic JSON data specified by the client.

_Type: object_



### `NxAppCreatePrivileges`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `resource` | string | Type of resources. For example sheet, story, bookmark etc. |
| `canCreate` | boolean | Is set to true if the user has privileges to create the resource. |

### `FileData`

_Type: string_


_Format: binary_



### `UpdateApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `attributes` | [AppAttributes](#appattributes) | Attribute used when updating the application |

### `DataModelMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `reload_meta` | [LastReloadMetadata](#lastreloadmetadata) | Metadata for the last app reload. |
| `static_byte_size` | integer | Static memory usage for the app. |
| `fields` | array&lt;[FieldMetadata](#fieldmetadata)> | List of field descriptions. |
| `tables` | array&lt;[TableMetadata](#tablemetadata)> | List of table descriptions. |

### `LastReloadMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `cpu_time_spent_ms` | integer | Number of CPU milliseconds it took to reload the app. |
| `hardware` | [HardwareMeta](#hardwaremeta) | Hardware available for the engine doing the reload. |

### `HardwareMeta`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `logical_cores` | integer | Number of logical cores available. |
| `total_memory` | integer | RAM available. |

### `FieldMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | Name of the field. |
| `src_tables` | array&lt;string> | List of table names. |
| `is_system` | boolean | If set to true, it means that the field is a system field. The default value is false. |
| `is_hidden` | boolean | If set to true, it means that the field is hidden. The default value is false. |
| `is_semantic` | boolean | If set to true, it means that the field is a semantic. The default value is false. |
| `distinct_only` | boolean | If set to true, only distinct field values are shown. The default value is false. |
| `cardinal` | integer | Number of distinct field values. |
| `total_count` | integer | Total number of field values. |
| `is_locked` | boolean | If set to true, it means that the field is locked. The default value is false. |
| `always_one_selected` | boolean | If set to true, it means that the field has one and only one selection (not 0 and not more than 1). If this property is set to true, the field cannot be cleared anymore and no more selections can be performed in that field. The default value is false. |
| `is_numeric` | boolean | Is set to true if the value is a numeric. The default value is false. |
| `comment` | string | Field comment. |
| `tags` | array&lt;string> | Gives information on a field. For example, it can return the type of the field. Examples: key, text, ASCII. |
| `byte_size` | integer | Static RAM memory used in bytes. |

### `TableMetadata`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | Name of the table. |
| `is_system` | boolean | If set to true, it means that the table is a system table. The default value is false. |
| `is_semantic` | boolean | If set to true, it means that the table is a semantic. The default value is false. |
| `is_loose` | boolean | If set to true, it means that the table is loose due to circular connection. The default value is false. |
| `no_of_rows` | integer | Number of rows. |
| `no_of_fields` | integer | Number of fields. |
| `no_of_key_fields` | integer | Number of key fields. |
| `comment` | string | Table comment. |
| `byte_size` | integer | Static RAM memory used in bytes. |

### `PublishApp`

_Type: object_


**Properties**

| Name | Type | Description |
| ---- | ---- | ----------- |
| `stream` | string | The id of the stream to publish to. This parameter is only valid in Qlik Sense Server. |