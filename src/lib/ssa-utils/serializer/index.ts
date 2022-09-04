import SSASubtitle from '../SSASubtitle';

import { eventsSerializer } from './events';
import scriptInfoSerializer from './info';
import { V4PlusStylesSerializer } from './styles';

const serializer = (ssaSubtitle: SSASubtitle) => {
  let subtitle = '';

  subtitle += scriptInfoSerializer(ssaSubtitle['Script Info']);
  subtitle += V4PlusStylesSerializer(ssaSubtitle['V4+ Styles']);
  subtitle += eventsSerializer(ssaSubtitle.Events);

  console.log(subtitle);
  return '';
};

export default serializer;
