import {Box, Text} from 'native-base';

export type IHeaderStatProps = {
  title: string;
  data: number | string;
};

const HeaderStat: React.FC<IHeaderStatProps> = ({title, data}) => {
  return (
    <Box mx={4} alignItems={'center'}>
      <Text color={'white'}>{data}</Text>
      <Text color={'white'}>{title}</Text>
    </Box>
  );
};

export default HeaderStat;
