type Status =
  | 'OK'
  | 'INTERNAL_ERROR'
  | 'NOT_FOUND'
  | 'UNAUTHORIZED'
  | 'CREATED'
  | 'UNPROCESSABLE_ENTITY';
type Message = { message: string };

type ServiceResponse<T> = {
  status: Status;
  body: T | Message;
};

export default ServiceResponse;
