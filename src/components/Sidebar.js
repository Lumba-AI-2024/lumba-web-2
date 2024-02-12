import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import FormModalContextProvider from "../context/FormModalContext";
import Form from "./Form";
import Select from "./Select/Select";
import { WORKSPACE, getAllWorkspace } from "../hooks/useWorkspaces";
import useSWR from "swr";
import useCookie from "../hooks/useCookie";

const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-house-door"
      viewBox="0 0 16 16"
    >
      <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
    </svg>
  );
};

const DatasetsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-clipboard-data"
      viewBox="0 0 16 16"
    >
      <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z" />
      <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
      <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
    </svg>
  );
};

const CleaningIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-eraser"
      viewBox="0 0 16 16"
    >
      <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
    </svg>
  );
};

const ModelingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-diagram-2"
      viewBox="0 0 16 16"
    >
      <path
        fillRule="evenodd"
        d="M6 3.5A1.5 1.5 0 0 1 7.5 2h1A1.5 1.5 0 0 1 10 3.5v1A1.5 1.5 0 0 1 8.5 6v1H11a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0V8h-5v.5a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 5 7h2.5V6A1.5 1.5 0 0 1 6 4.5v-1zM8.5 5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1zM3 11.5A1.5 1.5 0 0 1 4.5 10h1A1.5 1.5 0 0 1 7 11.5v1A1.5 1.5 0 0 1 5.5 14h-1A1.5 1.5 0 0 1 3 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm4.5.5a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1A1.5 1.5 0 0 1 9 12.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
      />
    </svg>
  );
};

const ComponentsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-boxes"
      viewBox="0 0 16 16"
    >
      <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z" />
    </svg>
  );
};

const links = [
  { label: "Home", icon: <HomeIcon />, href: "" },
  { label: "Datasets", icon: <DatasetsIcon />, href: "datasets" },
  { label: "Cleaning", icon: <CleaningIcon />, href: "cleaning" },
  { label: "Modeling", icon: <ModelingIcon />, href: "modeling" },
];

const NavLink = ({ href, label, icon, active, setActive, workspaceName }) => {
  return (
    <Link href={`/workspace/${workspaceName}/${href}`}>
      <li
        onClick={() => setActive(href)}
        className={`flex gap-3 items-center font-medium hover:text-lightblue cursor-pointer transition duration-300 ${
          active === href && "text-lightblue"
        }`}
      >
        {active === href && <span className="absolute left-0 rounded-r-[4px] h-6 w-1.5 bg-lightblue"></span>}
        {icon}
        <span className="">{label}</span>
      </li>
    </Link>
  );
};

export default function Sidebar() {
  const router = useRouter();
  const { asPath } = router;

  const [active, setActive] = React.useState(() => (asPath.split("/")[3] ? asPath.split("/")[3] : ""));
  const username = useCookie("username");
  const { data: workspaces } = useSWR([WORKSPACE, username], ([WORKSPACE, username]) =>
    getAllWorkspace(WORKSPACE, username)
  );

  const { workspaceName } = router.query;

  const currentWorkspace = workspaces?.filter((ws) => ws.name === workspaceName)[0];

  React.useEffect(() => {
    setActive(asPath.split("/")[3] ? asPath.split("/")[3] : `?type=${currentWorkspace?.type}`);
  }, [asPath, currentWorkspace]);

  if (asPath.split("/")[1] !== "workspace") return null;

  return (
    <div className="relative py-4 pl-8 h-[calc(100vh-55px)] bg-white shadow pr-4">
      <Link
        href="/"
        className="hover:text-transparent hover:bg-clip-text bg-gradient-to-r hover:from-lightblue hover:to-blue block mb-3"
      >
        &lt; Back to workspace
      </Link>
      <FormModalContextProvider>
        <Form handleSubmit={() => {}}>
          <div className="flex gap-2 items-center mb-2">
            <Select
              placeholder="Select workspace..."
              name="workspace"
              defaultSelected={workspaceName}
              items={workspaces?.map((workspace) => ({
                value: workspace.name,
                label: workspace.name,
              }))}
              onChange={(workspace) => {
                const ws = workspaces?.filter((ws) => ws.name === workspace);
                const { name, type } = ws[0];
                router.push(`/workspace/${name}?type=${type}`);
              }}
            />
          </div>
        </Form>
      </FormModalContextProvider>
      <ul className="flex flex-col gap-8 py-4">
        {links.map((link) => (
          <NavLink
            key={link.label}
            href={link.href + `?type=${currentWorkspace?.type}`}
            workspaceName={workspaceName}
            label={link.label}
            icon={link.icon}
            active={active}
            setActive={setActive}
          />
        ))}
        {process.env.NEXT_PUBLIC_NODE_ENV === "DEVELOPMENT" && (
          <Link href="/components">
            <li
              className={`flex gap-3 items-center font-medium hover:text-lightblue cursor-pointer transition duration-300`}
            >
              <ComponentsIcon />
              <span className="">Components</span>
            </li>
          </Link>
        )}
      </ul>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-20">
        <img src="/assets/LumbaSidebar.svg" alt="Lumba" />
      </div>
    </div>
  );
}
