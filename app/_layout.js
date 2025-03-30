import { Tabs } from "expo-router";
import { BookmarkProvider } from "../context/BookmarkContext";

export default function Layout() {
  return (
    <BookmarkProvider>
      <Tabs>
        <Tabs.Screen name="(tabs)/index" options={{ title: "Jobs" }} />
        <Tabs.Screen name="(tabs)/bookmarks" options={{ title: "Bookmarks" }} />
      </Tabs>
    </BookmarkProvider>
  );
}