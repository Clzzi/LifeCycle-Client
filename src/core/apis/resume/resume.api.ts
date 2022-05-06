import customAxios from 'src/core/libs/axios/customAxios';
import { AResumeResponse, ResumesResponse } from './resume.param';

class Resume {
  public async getResumes(): Promise<ResumesResponse> {
    const { data } = await customAxios.get('/resume');
    return data;
  }

  public async getAResume(idx: number): Promise<AResumeResponse> {
    const { data } = await customAxios.get(`/resume/${idx}`);
    return data;
  }
}

export default new Resume();
