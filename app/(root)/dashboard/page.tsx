import DashboardPage from "../../../components/dashboard-page";
import { fetchUserInfo } from "@/actions/getProxyList";

export default async function Dashboard() {
  const data = await fetchUserInfo();
const activeUserInfo = data.activeUserInfo;
// console.log(`Here we gooo`,data.activeUserInfo );

  return <DashboardPage proxies={data.userStatus} activeUserInfo={activeUserInfo} />;
}
 