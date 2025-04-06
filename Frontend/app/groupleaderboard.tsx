import BottomBar from "@/components/BottomBar/BottomBar";
import { groupsStyles } from "../styles/groupsStyles";
import { View, Button } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGroupDetail, getGroups, getUserDetail } from "@/api/api";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { Redirect, useRouter } from "expo-router";

interface Member {
  user_id: number;
  username: string;
  score: number
}

export default function GroupLeaderboard() {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const { userId, activeGroupId } = useContext(AppContext);
  const router = useRouter();

  const { data: groupData } = useQuery({
    queryKey: ["groupList"],
    queryFn: () => getGroupDetail(activeGroupId),
  });
  const { mutateAsync: getUserDetailMutation } = useMutation({
    mutationFn: (id: number) => getUserDetail(id),
  })

  useEffect(() => {
    if (groupData) {
      let member_list: Member[] = [];
      for (let i=0; i < groupData.members.length; i++) {
        let userData = await getUserDetailMutation(groupData[i])
        member_list.push({user_id: userData.user_id, username: userData.username, score: userData.score});
      }
      setMemberList([...member_list])
    }
  }, [groupData]);

  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={groupsStyles.bg}>
        {memberList.map((m: member, i) =>
        <View key={i}>
          <Text>#{i}</Text>
       <Text>{m.username}</Text>
       <Text>{m.score}</Text>
       </View>
      <BottomBar></BottomBar>
      </View>
    </>
  );
}
