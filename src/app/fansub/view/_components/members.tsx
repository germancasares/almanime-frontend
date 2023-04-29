import FansubApi from 'api/FansubApi';

import Loader from 'components/loader';

import './members.scss';

const Members = ({ acronym }: { acronym: string }) => {
  const { data: members } = FansubApi.GetMembers(acronym);

  if (!members) return (<Loader />);

  return (
    <table id="members" className="table is-fullwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {
          members.map(({ name, role }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{role}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

export default Members;
