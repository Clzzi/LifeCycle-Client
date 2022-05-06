import { Response } from 'src/types/common.type';
import { IResume } from 'src/types/resume.type';

export interface AResumeResponse extends Response {
  data: IResume;
}

export interface ResumesResponse extends Response {
  data: IResume[];
}
