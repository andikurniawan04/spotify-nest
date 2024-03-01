import { HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';

export class ResponseJson {
  protected respondSuccess(data: any, message: string, status = HttpStatus.OK) {
    const response = {
      status: true,
      message: message || undefined,
      data: data || undefined,
    };

    return response;
  }

  protected respondError(
    data: any,
    message: string,
    status = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    const response = {
      status: false,
      message: message || undefined,
      error: data || undefined,
    };

    return response;
  }
}
