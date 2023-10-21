/** @noSelfInFile **/
import { ModemManager } from "./network";

/// Common types
export interface CommonMessage {
  type: string;
  sender: number;
  recipent?: number;
}

export type FullModemMessage = {
  recipent?: number;
  message: CommonMessage;
  replyChannel: number;
};

/// Common Request Base
interface CommonMessageRequest extends CommonMessage {}

/// Request types
export interface HeartBeatRequest extends CommonMessage {}

export interface RoleAcquisitionRequest extends CommonMessage {
  assumeRole: false;
}

/// Common Response Base
interface CommonMessageResponse extends CommonMessage {}

/// Response Types
export interface RoleAcquisitionResponse extends CommonMessage {
  assumeRole: false;
}

/// Extras

export type ResponseMapping = Map<
  string,
  (
    this: void,
    message: CommonMessage,
    sendMessage: (message: CommonMessage) => void
  ) => void
>;
