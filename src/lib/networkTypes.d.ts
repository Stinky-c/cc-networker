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
export interface HeartbeatRequest extends CommonMessageRequest {}

export interface RoleAcquisitionRequest extends CommonMessageRequest {
  assumeRole: false;
}

/// Common Response Base
interface CommonMessageResponse extends CommonMessage {}

/// Response Types
export interface RoleAcquisitionResponse extends CommonMessageResponse {
  assumeRole: false;
}

export interface HeartbeatResponse extends CommonMessageResponse {}

// response/request mapping for emitters
type Wrapper<T extends CommonMessage> = {
  message: T;
  sendMessage: (message: CommonMessageResponse) => void;
};
export type NewResponseMapping = {
  HeartBeatResponse: Wrapper<HeartbeatResponse>;
};

export type NewRequestMapping = {
  HeartbeatRequest: Wrapper<HeartbeatRequest>;
  RoleAcquisitionRequest: Wrapper<RoleAcquisitionRequest>;
};
