type Status = 'SUCCESS' | 'INTERNAL_ERROR';
type Message = { message: string };

type ServiceResponse<T> = {
  status: Status;
  body: T | Message;
};

export default ServiceResponse;
