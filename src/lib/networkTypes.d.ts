/** @noSelfInFile **/

/// Common types
export interface CommonMessage {
  type: string;
  sender: number;
  recipent?: number;
}

export interface FullModemMessage {
  message: CommonMessage;
  replyChannel: number;
}

/// Common Request Base
interface CommonMessageRequest extends CommonMessage {}

/// Request types
export interface HeartBeatRequest extends CommonMessageRequest {}

export interface RoleAcquisitionRequest extends CommonMessageRequest {
  assumeRole: false;
}

/// Common Response Base
interface CommonMessageResponse extends CommonMessage {}

/// Response Types
export interface RoleAcquisitionResponse extends CommonMessageResponse {
  assumeRole: false;
}

export interface HeartBeatResponse extends CommonMessageResponse {}

/// Extras

type MessageFunction = (
  this: void,
  message: CommonMessageRequest,
  sendMessage: (message: CommonMessageResponse) => void
) => void;
export type MessageMapping = Map<string, MessageFunction>;
/**
 * Request from other computers
 */
export type RequestMapping = MessageMapping;

/**
 * Response to my requests
 */
export type ResponseMapping = MessageMapping;

// new response/request mapping for emitters
type Wrapper<T extends CommonMessage> = (
  this: void,
  message: T,
  sendMessage: (message: CommonMessageResponse) => void
) => void;

export type NewResponseMapping = {
  Heartbeat: Wrapper<HeartBeatResponse>;
};

export type NewRequestMapping = {
  Heartbeat: Wrapper<HeartBeatRequest>;
  RoleAcquisition: Wrapper<RoleAcquisitionRequest>;
};
