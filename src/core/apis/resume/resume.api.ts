import customAxios from 'src/core/libs/axios/customAxios';
import { aResumeParam, AResumeResponse, ResumesResponse } from './resume.param';

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
}

export default new Resume();
