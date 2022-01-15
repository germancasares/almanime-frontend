import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMembers } from 'app/fansub/store/actions';
import { State } from 'app/store';

const Members = ({ acronym }: { acronym?: string }) => {
  const dispatch = useDispatch();

  const members = useSelector((state: State) => state.fansub.members);

  useEffect(() => {
    if (acronym === undefined) return;

    dispatch(getMembers(acronym));
  }, [acronym, dispatch]);

  return (
    <>
      {
        members.map((member) => (
          <div key={member.name}>
            {member.name} {member.role}
          </div>
        ))
      }
    </>
  );
};

export default Members;
