import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import Cards from "@/components/Cards";
import Friends from "@/components/Friends";

export default function Home() {
  console.log('Next js server');
  return (
    <div>
      <NavBar></NavBar>
      <Banner></Banner>
      <Cards></Cards>
      <Friends></Friends>
    </div>
  );
}
