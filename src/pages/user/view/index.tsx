import { Link, useParams } from "react-router-dom";
import UserApi from "../../../api/UserApi";
import Loader from "../../../components/loader";
import routes from "../../routes";

const View = ({ accessToken }: { accessToken?: string }) => {
  const { name } = useParams<{ name: string }>();

  const { data: me } = UserApi.Me(accessToken);

  if (!me) return <Loader />;

  return (
    <>
      Hello from View
      {name === me.name && <Link to={routes.user.edit.path}>Edit</Link>}
    </>
  );
};

export default View;
