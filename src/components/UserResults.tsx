import { Box } from "native-base";
import React, { useEffect } from "react";
import { FlatList } from "react-native";
import { useUsers } from "../hooks/reactQueryHooks";
import { Loader } from "./Loader";
import { UserItem } from "./UserItem";
import { UserList } from "./UserList";

export type IUserResultsProps = {
  search: string;
};

const UserResults: React.FC<IUserResultsProps> = ({ search }) => {
  const { status, data, refetch } = useUsers(search);

  useEffect(() => {
    if (search !== "") {
      refetch();
    }
  }, [search]);

  // console.log('data', data);
  // if (status === 'loading') {
  //   return <Loader />;
  // }

  return (
    <Box flex={1}>
      {status === "loading" && (
        <Box position={"absolute"} h="100%" w="100%">
          <Loader />
        </Box>
      )}
      <UserList users={data || []} />
    </Box>
  );
};

export { UserResults };
