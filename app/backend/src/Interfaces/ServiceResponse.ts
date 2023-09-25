type Status = 'OK' | 'INTERNAL_ERROR' | 'NOT_FOUND';
type Message = { message: string };

type ServiceResponse<T> = {
  status: Status;
  body: T | Message;
};

export default ServiceResponse;
