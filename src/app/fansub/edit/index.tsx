import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import FansubApi from 'api/FansubApi';
import Permission from 'enums/Permission';

import './index.scss';

const Edit = ({ accessToken }: { accessToken?: string }) => {
  const { acronym } = useParams<{ acronym: string }>();

  const { data } = FansubApi.GetRoles(acronym, accessToken);
  const [roles, setRoles] = useState(data);
  useEffect(() => {
    setRoles(data);
  }, [data]);

  const { getAccessTokenSilently } = useAuth0();
  const { mutateAsync, isLoading } = FansubApi.UpdateRoles(acronym);
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!roles) return;

    await mutateAsync({
      roles,
      accessToken: await getAccessTokenSilently(),
    });
  };

  const permissionArray = Object.keys(Permission) as Permission[];

  return (
    <main id="fansub-edit" className="container">
      <section className="column is-narrow">
        <h3 className="title">
          {`Edit ${acronym}`}
        </h3>
        <form onSubmit={onSubmit} autoComplete="on">
          <table className="table">
            <thead>
              <tr>
                <th>Role</th>
                {
                  permissionArray.map((permission) => (<th key={permission}>{permission}</th>))
                }
              </tr>
            </thead>
            <tbody>
              {
                roles && Object.entries(roles).map(([role, permissions]) => (
                  <tr key={role}>
                    <th>{role}</th>
                    {
                      permissionArray.map((permission) => (
                        <td key={permission}>
                          <input
                            type="checkbox"
                            disabled={role === 'Admin' && permission === Permission.EditPermissions}
                            checked={permissions.includes(permission)}
                            onChange={({ target: { checked } }) => {
                              const newPermissions = checked
                                ? permissions.concat(permission)
                                : permissions.filter((p) => p !== permission);

                              setRoles({
                                ...roles,
                                [role]: newPermissions,
                              });
                            }}
                          />
                        </td>
                      ))
                    }
                  </tr>
                ))
              }
            </tbody>
          </table>

          <div className="control">
            <button type="submit" className={`button is-link${isLoading ? ' is-loading' : ''}`}>Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Edit;
