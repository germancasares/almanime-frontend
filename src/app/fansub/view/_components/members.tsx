import FansubApi from 'api/FansubApi';

const Members = ({ acronym }: { acronym?: string }) => {
  const { data: members } = FansubApi.GetMembers(acronym);

  return (
    <>
      {
        members && members.map((member) => (
          <div key={member.name}>
            {member.name} {member.role}
          </div>
        ))
      }
    </>
  );
};

export default Members;
