import {images} from "../../../assets/images/images"
import {
    useCreateProjectMutation,
    useDeleteProjectMutation,
    useGetAllProjectsQuery,
    useGetPinnedProjectQuery,
    usePinProjectMutation,
    useUnpinProjectMutation
} from "../../../api/testApi.ts";
import {useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useAppDispatch, useAppSelector, useDocumentTitle} from "../../../app/hooks.ts";
import {useEffect} from "react";

import {
    addProject,
    setProjects,
    deleteProject,
} from "../../../app/slices/ProjectsSlice.ts";
import {
    addPinnedProject,
    setPinnedProjects,
    deletePinnedProject,
    unpinPinnedProject
} from "../../../app/slices/PinnedProjectsSlice.ts";

import {Project} from "../../../store/types.ts";
import {store} from "../../../store/store.ts";

export const Projects = () => {

    useDocumentTitle(`Projects - WebNode`);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [createProject, { isLoading: isProjectCreationLoading }] = useCreateProjectMutation();
    const [pinProject, { isLoading : pinLoading}] = usePinProjectMutation()
    const [unpinProject, { isLoading : unpinLoading}] = useUnpinProjectMutation()
    const [deleteProjectRequest, { isLoading : deleteLoading}] = useDeleteProjectMutation()

    const current_user_userId = localStorage.getItem("userId")!;

    const { data: projectsData, isLoading: isAllProjectsLoading } = useGetAllProjectsQuery(current_user_userId);
    const { data: pinnedProjectsData, isLoading: isPinnedProjectsLoading } = useGetPinnedProjectQuery(current_user_userId);

    useEffect(() => {
        if (projectsData) {
            dispatch(setProjects(projectsData.projects));
        }
    }, [projectsData, dispatch]);

    useEffect(() => {
        if (pinnedProjectsData) {
            dispatch(setPinnedProjects(pinnedProjectsData.projects));
        }
    }, [pinnedProjectsData, dispatch]);

    const projects_array = useAppSelector((state) => state.Projects.projects);
    const pinned_projects_array = useAppSelector((state) => state.PinnedProjects.projects);

    const getLatestUpdateDate = (data: typeof projectsData) => {
        if (!data?.projects || data.projects.length === 0) return null;

        // Создаем массив дат updatedAt
        const updatedDates = data.projects.map(project => new Date(project.updatedAt));

        // Находим самую позднюю дату
        const latestDate = new Date(Math.max(...updatedDates.map(date => date.getTime())));

        return latestDate.toISOString();
    };

    const latestUpdate = getLatestUpdateDate(projectsData);

    const onCreateProject = async () => {
        if (current_user_userId) {
            try {
                const response = await createProject({
                    userId: current_user_userId,
                }).unwrap();

                if (response.project) {
                    const project = response.project
                    console.log('Before dispatch', store.getState()); // добавьте это
                    dispatch(addProject(project));
                    console.log('After dispatch', store.getState()); // добавьте это
                    navigate(`/workspace/${response.project.id}`);
                }
            } catch (error) {
                console.error('Project creation failed:', error);
            }
        }
    };

    interface ProjectComponentProps {
        project: Project;
        key: string;
        id: string
        title: string
        updatedAt: string
    }

    const ProjectComponent = (props: ProjectComponentProps) => {
        return (
            <div
                key={props.id}
                className="w-[calc(50%-12.5px)] bg-[#171C20] rounded-[10px]  border-[#515558] border-[1px] box-border relative">
                <div className="flex flex-row justify-between items-center">
                    <button
                        onClick={() => {
                            navigate(`/workspace/${props.id}`);
                        }}
                        className="
                                            z-1
                                            py-[25px] pl-[25px]
                                            w-[calc(100%)] h-[calc(100%)] flex flex-col text-left gap-[5px] bg-transparent cursor-pointer border-0">
                        <span className="text-[#FFF] font-[Inter-normal] text-[20px]">{props.title}</span>
                        <div className="text-[#FFF] font-[Inter-normal] text-[12px]">Last updated - {new Date(props.updatedAt).toLocaleDateString('en-GB')}</div>
                    </button>

                    <div className="z-2 absolute right-[25px]
                                         flex flex-row items-start justify-end">
                        <button
                            onClick={() => {
                                console.log(props.project)
                                if (props.project.isPinned == true) {
                                    dispatch(unpinPinnedProject(props.project));
                                    unpinProject({projectId: props.id})
                                }
                                if (props.project.isPinned == false) {
                                    dispatch(addPinnedProject(props.project));
                                    pinProject({projectId: props.id})
                                }
                            }}
                            className="flex items-center justify-center bg-transparent border-0 focus:outline-none cursor-pointer h-[36px] w-[36px] px-[0] py-[0]">
                            <img className="w-[24px] h-[24px] p-[6px] hover:bg-[#FFFFFF13] hover:rounded-[5px]" src={images.Paperclip_Attechment_Tilt} alt=""/>
                        </button>
                        <button
                            onClick={() => {
                                navigate(`/workspace/${props.id}`);
                            }}
                            className="flex w-[14px] h-[36px] bg-[#171C20] border-[0px] cursor-pointer">

                        </button>
                        <button
                            onClick={() => {
                                dispatch(deletePinnedProject(props.project))
                                dispatch(deleteProject(props.project))
                                deleteProjectRequest(props.project.id)

                            }}
                            className="flex items-center justify-center bg-transparent border-0 focus:outline-none cursor-pointer h-[36px] w-[36px] px-[0] py-[0]">
                            <img className="w-[24px] h-[24px] p-[6px] hover:bg-[#FFFFFF13] hover:rounded-[5px]" src={images.Trash_Full} alt=""/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex w-full h-full"
        >
            <div className="flex w-[calc(100%-100px)] h-[calc(100%-100px)] p-[50px] overflow-y-scroll ">
                <div className="w-[80%] flex flex-col">
                    <div className="flex flex-col w-full gap-[16px]">
                        <div className="text-[#FFF] font-[Inter-semibold]  text-[40px]">Templates</div>
                        <div className="flex flex-row gap-[25px]">
                            <button
                                onClick={onCreateProject}
                                className={`animation_transform w-[calc(50%-12.5px)] flex items-center justify-between px-[25px] text-[24px]
                                 text-[#FFF] font-[Inter-semibold] rounded-[10px] bg-[#333E42] border-[1px] border-[#666E71] cursor-pointer
                                 ${isProjectCreationLoading ? 'opacity-75' : ''}
                                 `}>
                                <div>Create new project</div>
                                <img className="" src={images.Add_Plus} alt=""/>
                            </button>
                            <div className="w-[calc(50%-12.5px)] gap-[25px] flex flex-row justify-between">
                                <div className="animation_transform flex w-[calc(33.3%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter-medium] text-[16px] ">Template 1</div>
                                </div>
                                <div className="animation_transform flex w-[calc(33.3%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter-medium] text-[16px] ">Template 2</div>
                                </div>
                                <div className="animation_transform flex w-[calc(33.4%-12.5px)] py-[35px] bg-[#1F2428] rounded-[10px] cursor-pointer items-center justify-center border-[#575B5E] border-[1px]">
                                    <div className="text-[#FFF] font-[Inter-medium] text-[16px] ">Template 3</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px]">
                        <div className="text-[#FFF] font-[Inter-semibold] text-[40px]">Pinned Projects</div>
                        <div className="flex flex-row w-full mt-[30px] flex-wrap" style={{ gap: "25px" }}>
                            {pinned_projects_array?.map((project) => (
                                <ProjectComponent
                                    project={project}
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    updatedAt={project.updatedAt}
                                ></ProjectComponent>
                            ))}
                        </div>
                        <div className="mt-[53px] w-full h-[1px] bg-[#4E5053]"></div>
                    </div>
                    <div className="flex flex-col w-full gap-[16px] mt-[56px] ">
                        <div className="text-[#FFF] font-[Inter-semibold] text-[40px]">Latest Projects</div>
                        <div className="text-[#FFF] font-[Inter-semibold] text-[20px]">{new Date(String(latestUpdate)).toLocaleDateString('en-GB')}</div>
                        <div className="flex flex-row w-full mt-[30px] gap-[25px] flex-wrap">
                            {projects_array?.map((project) => (
                                <ProjectComponent
                                    project={project}
                                    key={project.id}
                                    id={project.id}
                                    title={project.title}
                                    updatedAt={project.updatedAt}
                                ></ProjectComponent>
                            ))}
                            <div className="w-full h-[10%]"></div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};