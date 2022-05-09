import { Response } from 'src/types/common.type';
import { IResume } from 'src/types/resume.type';

export interface AResumeResponse extends Response {
  data: IResume;
}

export interface ResumesResponse extends Response {
  data: IResume[];
}

export interface aResumeParam {
  idx: number;
}

export interface UploadResponse extends Response {
  data: string[];
}

export interface makeResumeParams {
  title: string | undefined;
  company: string | undefined;
  stack: string | undefined;
  thumbnail: string | undefined;
  content: string | undefined;
}
