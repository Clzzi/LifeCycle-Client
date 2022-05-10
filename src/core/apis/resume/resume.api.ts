import customAxios from 'src/core/libs/axios/customAxios';
import { Response } from 'src/types/common.type';
import {
  aResumeParam,
  AResumeResponse,
  makeResumeParams,
  ResumesResponse,
  UploadResponse,
} from './resume.param';

class Resume {
  public async getResumes(): Promise<ResumesResponse> {
    const { data } = await customAxios.get<ResumesResponse>('/resume');
    return data;
  }

  public async getAResume(params: aResumeParam): Promise<AResumeResponse> {
    const { data } = await customAxios.get<AResumeResponse>(
      `/resume/${params.idx}`,
    );
    return data;
  }

  public async upload(file: FormData): Promise<UploadResponse> {
    const { data } = await customAxios.post<UploadResponse>('/image', file);
    return data;
  }

  public async makeResume(parmas: makeResumeParams): Promise<Response> {
    const { data } = await customAxios.post<Response>('/resume', parmas);
    return data;
  }

  public async deleteResume(): Promise<Response> {
    const { data } = await customAxios.delete<Response>('/resume');
    return data;
  }

  public async updateResume(
    params: makeResumeParams,
  ): Promise<AResumeResponse> {
    const { data } = await customAxios.put<AResumeResponse>('/resume', params);
    return data;
  }
}

export default new Resume();
