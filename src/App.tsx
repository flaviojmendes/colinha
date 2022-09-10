import { ChangeEvent, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Button, Input } from "@chakra-ui/react";
import html2canvas from "html2canvas";
import ReactGA from "react-ga4";

function App() {
  const [gov, setGov] = useState(["", ""]);
  const [sen, setSen] = useState(["", "", ""]);
  const [depFed, setDepFed] = useState(["", "", "", ""]);
  const [depDist, setDepDist] = useState(["", "", "", "", ""]);

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
  const printRef = useRef(null);

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
    newGov[index] = event.target.value;
    setGov(newGov);

    if (index === 0) {
      refGov1.current?.focus();
    }
  }

  function handleSenChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newSen = Object.assign([] as string[], sen);
    newSen[index] = event.target.value;
    setSen(newSen);

    if (index === 0) {
      refSen1.current?.focus();
    }
    if (index === 1) {
      refSen2.current?.focus();
    }
    if (index === 2) {
      refGov0.current?.focus();
    }
  }

  function handleDepFedChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newDepFed = Object.assign([] as string[], depFed);
    newDepFed[index] = event.target.value;
    setDepFed(newDepFed);

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
    }
  }

  function handleDepDistChange(
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    let newDepDist = Object.assign([] as string[], depDist);
    newDepDist[index] = event.target.value;
    setDepDist(newDepDist);

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
    }
  }

  return (
    <div className="w-screen h-full min-h-screen bg-red-200 text-center pt-6">
      <h1 className="text-red-800 text-5xl font-main">
        Já sabe em quem vai votar?
      </h1>
      <h2 className="text-red-800 text-3xl font-main mt-2">
        Anote, salve, imprima e não esqueça no dia da eleição!
      </h2>

      <h2 className="text-red-800 text-xl font-main mt-2">
        (essa é a ordem das urnas)
      </h2>
      <div className="flex flex-col md:ml-[25%]" ref={printRef}>
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
        </div>
      </div>
      <Button
        marginTop={8}
        colorScheme={"red"}
        fontSize={"2xl"}
        onClick={handleDownloadImage}
      >
        Imprimir/Salvar
      </Button>
    </div>
  );
}

export default App;
