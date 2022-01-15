import { Fansub } from 'types/fansub';
import { Member } from 'types/member';
import { Subtitle } from 'types/subtitle';

class FansubApi {

  public static async GetByAcronym(acronym: string): Promise<Fansub> {
    return (await fetch(`fansub/acronym/${acronym}`)).json();
  }

  public static async GetMembers(acronym: string): Promise<Member[]> {
    return (await fetch(`fansub/acronym/${acronym}/members`)).json();
  }

  public static async GetSubtitles(acronym: string): Promise<Subtitle[]> {
    return (await fetch(`fansub/acronym/${acronym}/subtitles`)).json();
  }

  public static async IsMember(acronym: string, accessToken: string): Promise<boolean> {
    return (await fetch(
      `fansub/acronym/${acronym}/isMember`, 
      { 
        headers: { 
          'Authorization': `Bearer ${accessToken}`,
        },
      },
    )).json();
  }

  public static async Post(fansub: Fansub, accessToken: string): Promise<void> {
    fetch('fansub', {
      method: 'POST',
      body: JSON.stringify(fansub),
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
  }

}

export default FansubApi;
