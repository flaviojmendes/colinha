import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Input } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import ReactGA from "react-ga4";
import { candidates } from "./candidates";
import { Select } from "@chakra-ui/react";

function App() {
  ReactGA.initialize("G-ME7H2WXL4Q");
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });

  const ufs = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MS",
    "MT",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const [gov, setGov] = useState(["", ""]);
  const [sen, setSen] = useState(["", "", ""]);
  const [depFed, setDepFed] = useState(["", "", "", ""]);
  const [depDist, setDepDist] = useState(["", "", "", "", ""]);
  const [uf, setUf] = useState("");

  const refGov0 = useRef<HTMLInputElement>(null);
  const refGov1 = useRef<HTMLInputElement>(null);
  const refSen0 = useRef<HTMLInputElement>(null);
  const refSen1 = useRef<HTMLInputElement>(null);
  const refSen2 = useRef<HTMLInputElement>(null);
  const refDepFed0 = useRef<HTMLInputElement>(null);
  const refDepFed1 = useRef<HTMLInputElement>(null);
  const refDepFed2 = useRef<HTMLInputElement>(null);
  const refDepFed3 = useRef<HTMLInputElement>(null);
  const refDepDist0 = useRef<HTMLInputElement>(null);
  const refDepDist1 = useRef<HTMLInputElement>(null);
  const refDepDist2 = useRef<HTMLInputElement>(null);
  const refDepDist3 = useRef<HTMLInputElement>(null);
  const refDepDist4 = useRef<HTMLInputElement>(null);

  const [selectedDepFed, setSelectedDepFed] = useState("");
  const [selectedDepDist, setSelectedDepDist] = useState("");
  const [selectedSen, setSelectedSen] = useState("");
  const [selectedGov, setSelectedGov] = useState("");
  const printRef = useRef(null);

  useEffect(() => {}, []);

  function getCandidate(uf: string, text: string) {
    let candidateName = "";
    candidates
      .filter((candidate) => candidate["SG_UF"] === uf)
      .forEach((candidate) => {
        if (candidate["NR_CANDIDATO"] === +text) {
          candidateName = candidate["NM_URNA_CANDIDATO"];
          return;
        }
      });
    return candidateName;
  }

  function handleClean() {
    setGov(["", ""]);
    setSen(["", "", ""]);
    setDepFed(["", "", "", ""]);
    setDepDist(["", "", "", "", ""]);
    setSelectedDepDist("");
    setSelectedDepFed("");
    setSelectedGov("");
    setSelectedSen("");
  }

  async function handleDownloadImage() {
    ReactGA.event({
      category: "download",
      action: "download",
    });

    const element = printRef.current || document.body;

    const canvas = await html2canvas(element);

    const data = canvas.toDataURL();
    const link = document.createElement("a");

    if (typeof link.download === "string") {
      link.href = data;
      link.download = `colinha.png`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  }

  function handleGovChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newGov = Object.assign([] as string[], gov);
    if (index === 1 && event.target.value.length > 1) {
      return;
    }
    newGov[index] = event.target.value;
    setGov(newGov);
    if (event.target.value !== "") {
      if (index === 0) {
        refGov1.current?.focus();
      } else if(index === 1) {
        setSelectedGov(getCandidate(uf, newGov.join("")));
      }
    }
  }

  function handleSenChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newSen = Object.assign([] as string[], sen);
    newSen[index] = event.target.value;
    setSen(newSen);
    if (event.target.value !== "") {
      if (index === 0) {
        refSen1.current?.focus();
      }
      if (index === 1) {
        refSen2.current?.focus();
      }
      if (index === 2) {
        refGov0.current?.focus();
        setSelectedSen(getCandidate(uf, newSen.join("")));
      }
    }
  }

  function handleDepFedChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newDepFed = Object.assign([] as string[], depFed);
    newDepFed[index] = event.target.value;
    setDepFed(newDepFed);
    if (event.target.value !== "") {
      if (index === 0) {
        refDepFed1.current?.focus();
      }
      if (index === 1) {
        refDepFed2.current?.focus();
      }
      if (index === 2) {
        refDepFed3.current?.focus();
      }
      if (index === 3) {
        refDepDist0.current?.focus();
        setSelectedDepFed(getCandidate(uf, newDepFed.join("")));
      }
    }
  }

  function handleDepDistChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newDepDist = Object.assign([] as string[], depDist);
    newDepDist[index] = event.target.value;
    setDepDist(newDepDist);

    if (event.target.value !== "") {
      if (index === 0) {
        refDepDist1.current?.focus();
      }
      if (index === 1) {
        refDepDist2.current?.focus();
      }
      if (index === 2) {
        refDepDist3.current?.focus();
      }
      if (index === 3) {
        refDepDist4.current?.focus();
      }
      if (index === 4) {
        refSen0.current?.focus();
        setSelectedDepDist(getCandidate(uf, newDepDist.join("")));
      }
    }
  }

  return (
    <div className="w-screen h-full min-h-screen bg-white text-center">
      <div className="flex flex-col bg-red-800 py-4">
        <h1 className="text-white text-3xl md:text-5xl font-main">
          Já sabe em quem vai votar?
        </h1>
        <h2 className="text-white text-xl md:text-3xl font-main mt-2">
          Anote, salve, imprima e não esqueça no dia da eleição!
        </h2>

        <h2 className="text-white text-lg md:text-xl font-main mt-2">
          (essa é a ordem das urnas)
        </h2>
      </div>
      <div className="flex">
        <div className="grow"></div>
        <div id="area" className="py-8" ref={printRef}>
          <div className="flex flex-wrap mt-2">
            <h1 className="text-center text-2xl font-main text-white  bg-[#262730] w-[300px] m-auto rounded-lg py-2">
              colinha.net
            </h1>
          </div>
          <div className="text-center m-auto mt-2 w-[300px]">
            <Select placeholder="Selecione UF" bg='red.800' color={'white'} size={"lg"} onChange={(e) => setUf(e.target.value)}>
              {ufs.map(uf => {return(<option value={uf}>{uf}</option>)})}
              
              
            </Select>
          </div>
          <div className="flex flex-wrap mt-10">
            <span className="text-red-900 text-2xl my-auto mr-4  mb-2  w-screen md:w-[400px] text-center md:text-right">
              Dep. Federal
            </span>
            <div className="m-auto md:flex md:flex-row md:ml-0 w-[350px]">
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                marginRight={"2"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={depFed[0]}
                onChange={(e) => handleDepFedChange(e, 0)}
                maxLength={1}
                ref={refDepFed0}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                marginRight={"2"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={depFed[1]}
                onChange={(e) => handleDepFedChange(e, 1)}
                maxLength={1}
                ref={refDepFed1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                marginRight={"2"}
                value={depFed[2]}
                onChange={(e) => handleDepFedChange(e, 2)}
                maxLength={1}
                ref={refDepFed2}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={depFed[3]}
                onChange={(e) => handleDepFedChange(e, 3)}
                maxLength={1}
                ref={refDepFed3}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
            </div>
            <span className="text-xl text-red-800 justify-start m-auto font-semibold font-main min-w-[200px]">
              {selectedDepFed}
            </span>
          </div>
          <div className="flex flex-wrap mt-10">
            <span className="text-red-900 text-2xl my-auto mr-4  mb-2 w-screen md:w-[400px] text-center md:text-right">
              Dep. Estadual/Distrital
            </span>
            <div className="m-auto md:flex md:flex-row md:ml-0 w-[350px]">
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                marginRight={"2"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={depDist[0]}
                onChange={(e) => handleDepDistChange(e, 0)}
                maxLength={1}
                ref={refDepDist0}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                marginRight={"2"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={depDist[1]}
                onChange={(e) => handleDepDistChange(e, 1)}
                maxLength={1}
                ref={refDepDist1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                marginRight={"2"}
                value={depDist[2]}
                onChange={(e) => handleDepDistChange(e, 2)}
                maxLength={1}
                ref={refDepDist2}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>{" "}
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                marginRight={"2"}
                value={depDist[3]}
                onChange={(e) => handleDepDistChange(e, 3)}
                maxLength={1}
                ref={refDepDist3}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                marginRight={"2"}
                value={depDist[4]}
                onChange={(e) => handleDepDistChange(e, 4)}
                maxLength={1}
                ref={refDepDist4}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
            </div>
            <span className="text-xl text-red-800 justify-start m-auto font-semibold font-main min-w-[200px]">
              {selectedDepDist}
            </span>
          </div>
          <div className="flex flex-wrap mt-10">
            <span className="text-red-900 text-2xl my-auto mr-4  mb-2  w-screen md:w-[400px] text-center md:text-right">
              Senado
            </span>
            <div className="m-auto md:flex md:flex-row md:ml-0 w-[350px]">
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                marginRight={"2"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={sen[0]}
                onChange={(e) => handleSenChange(e, 0)}
                maxLength={1}
                ref={refSen0}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                marginRight={"2"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={sen[1]}
                onChange={(e) => handleSenChange(e, 1)}
                maxLength={1}
                ref={refSen1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={sen[2]}
                onChange={(e) => handleSenChange(e, 2)}
                maxLength={1}
                ref={refSen2}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
            </div>
            <span className="text-xl text-red-800 justify-start m-auto font-semibold font-main min-w-[200px]">
              {selectedSen}
            </span>
          </div>
          <div className="flex flex-wrap mt-10">
            <span className="text-red-900 text-2xl my-auto mr-4  mb-2 w-screen md:w-[400px] text-center md:text-right">
              Governo
            </span>
            <div className="m-auto md:flex md:flex-row md:ml-0 w-[350px]">
              <Input
                w={"55px"}
                h={50}
                type="number"
                ref={refGov0}
                marginY={"auto"}
                marginRight={"2"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={gov[0]}
                onChange={(e) => handleGovChange(e, 0)}
                maxLength={1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={gov[1]}
                onChange={(e) => handleGovChange(e, 1)}
                maxLength={1}
                ref={refGov1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
            </div>
            <span className="text-xl text-red-800 justify-start m-auto font-semibold font-main min-w-[200px]">
              {selectedGov}
            </span>
          </div>
          <div className="flex flex-wrap mt-10">
            <span className="text-red-900 text-2xl my-auto mr-4 mb-2 w-screen md:w-[400px] text-center md:text-right">
              Presidente
            </span>
            <div className="m-auto md:flex md:flex-row md:ml-0 w-[350px]">
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                marginRight={"2"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={"1"}
                maxLength={1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
              <Input
                w={"55px"}
                h={50}
                type="number"
                marginY={"auto"}
                color={"red.800"}
                className="font-main font-bold"
                backgroundColor={"white"}
                fontSize={"3xl"}
                value={"3"}
                maxLength={1}
                borderWidth={"2px"}
                borderColor={"red.800"}
              ></Input>
            </div>
            <span className="text-xl text-red-800 justify-start m-auto font-semibold font-main min-w-[200px]">
              {"LULA"}
            </span>
          </div>
        </div>
        <div className="grow"></div>
      </div>
      <Button
        marginTop={8}
        marginBottom={24}
        className="font-main"
        fontWeight={"medium"}
        backgroundColor={"#262730"}
        textColor={"white"}
        _hover={{ bg: "red.600" }}
        fontSize={"2xl"}
        onClick={handleDownloadImage}
      >
        Imprimir/Salvar
      </Button>
      <Button
        marginTop={8}
        marginBottom={24}
        marginLeft={2}
        className="font-main"
        fontWeight={"medium"}
        backgroundColor={"#262730"}
        textColor={"white"}
        _hover={{ bg: "red.600" }}
        fontSize={"2xl"}
        onClick={handleClean}
      >
        Limpar
      </Button>
      <footer
        className="w-full h-16 bg-red-800 
            absolute left-0 bottom-0
            flex justify-center items-center
            text-white text-md
            "
      >
        <span>
          feito com ❤️ por{" "}
          <a
            href="https://twitter.com/flaviojmendes"
            target={"_blank"}
            className="text-red-300"
          >
            {" "}
            flaviojmendes
          </a>
        </span>
      </footer>
    </div>
  );
}

export default App;
