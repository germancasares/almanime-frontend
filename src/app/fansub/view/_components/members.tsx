import FansubApi from 'api/FansubApi';

import Loader from 'components/loader';

const Members = ({ acronym }: { acronym: string }) => {
  const { data: members } = FansubApi.GetMembers(acronym);

  if (!members) return (<Loader />);

  return (
    <>
      {
        members.map(({ name, role }) => (
          <div key={name}>
            {`${name} ${role}`}
          </div>
        ))
      }
    </>
  );
};

export default Members;
