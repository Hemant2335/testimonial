
type ViewAppointmentProps = {
  user: {
    name: string;
    email: string;
  };
};

const ViewAppointmentUserCard = (props: ViewAppointmentProps) => {
  return <div>ViewAppointmentUserCard {props.user.name}</div>;
};

export default ViewAppointmentUserCard;
