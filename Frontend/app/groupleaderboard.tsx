import BottomBar from "@/components/BottomBar/BottomBar";
import { groupsStyles } from "../styles/groupsStyles";
import { View, Button } from "react-native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getGroups, getUserDetail } from "@/api/api";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./_layout";
import { Redirect, useRouter } from "expo-router";

interface Group {
  id: number;
  name: string;
  members: number[];
  admin: string;
}

export default function Groups() {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const { userId, setActiveGroupId } = useContext(AppContext);
  const router = useRouter();

  const { data: groupData } = useQuery({
    queryKey: ["groupList"],
    queryFn: () => getGroups(),
  });

  useEffect(() => {
    if (groupData) {
      setGroupList([
        ...groupData.filter((g: Group) => g.members.includes(userId)),
      ]);
    }
  }, [groupData]);

  const handleGroupClick = (id: number) => {
    setActiveGroupId(id);
    router.navigate("/groupleaderboard");
  };
  const handleEditGroupClick = (id: number) => {
    setActiveGroupId(id);
    router.navigate("/editgroup");
  };

  if (userId === -1) {
    return <Redirect href="/signin"></Redirect>;
  }
  return (
    <>
      <View style={groupsStyles.bg}>
        <View style={groupsStyles.bg}>
          <View style={groupsStyles.container}>
            <View style={groupsStyles.content}>
              {groupList.map((g: Group, id) => {
                return (
                  <View key={id}>
                    <Button
                      title={g.name}
                      onPress={() => handleGroupClick(g.id)}
                    />
                    <Button
                      title="Edit"
                      onPress={() => handleEditGroupClick(g.id)}
                    />
                  </View>
                );
              })}
              <View>
                <Button
                  title="Add New Group +"
                  onPress={() => router.navigate("/addgroup")}
                ></Button>
              </View>
            </View>
          </View>
        </View>
      </View>
      <BottomBar></BottomBar>
    </>
  );
}
