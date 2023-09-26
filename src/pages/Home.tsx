import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import { Database } from '../supabase.types';
import { Button, Collapse, Input } from 'reactstrap';
import { ChevronDown } from 'react-bootstrap-icons';
import CreateProjectModal from '../components/CreateProjectModal';
import './Home.css';

enum Tabs {
    Projects,
    Jobs,
}

/*interface Project {
    id: string,
    name: string,
    fileName: string,
    dateCreated: string,
    dateModified: string,
}*/

/*interface Job {
    id: string,
    projectName: string,
    dateStarted: string,
    dateFinished?: string,
    progressPercentage: number,
}*/

type Project = Database['public']['Tables']['projects']['Row'];

export default function Home() {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Projects);
    const [projects, setProjects] = useState<Project[]>([]);
    //const [jobs, setJobs] = useState<Array<Job>>([]);
    const [currentProject, setCurrentProject] = useState<Number>(-1);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        document.title = "Blendus";
        fetchProjects();
    }, []);

    async function fetchProjects() {
        const { data, error } = await supabase.from('projects').select();
        if (error) {
            console.log(error.message);
            return;
        }
        console.log(data);
        setProjects(data);
    }

    function selectCurrentProject(i: Number) {
        if (currentProject === i) setCurrentProject(-1);
        else setCurrentProject(i);
    }

    /*function handleFocusChange(i: number) {
        if (i === selectedProject) {
            setSelectedProject(-1);
        } else {
            setSelectedProject(i);
        }
    }*/

    const [projectListSearch, setProjectListSearch] = useState<string>("");

    function renderProjects() {
        const filteredProjects = (projectListSearch === "") ? projects : projects.filter((p) => {
            const term = projectListSearch;
            return (p.name?.toLocaleLowerCase().match(term.toLocaleLowerCase()) ?? false)
                || (p.author?.toLocaleLowerCase().match(term.toLocaleLowerCase()) ?? false)
                || (p.filename?.toLocaleLowerCase().match(term.toLocaleLowerCase()) ?? false)
                || (p.description?.toLocaleLowerCase().match(term.toLocaleLowerCase()) ?? false)
                || (p.id.match(term) ?? false);
        });
        const renderedProjects = filteredProjects.map((p, i) => {
            let isCurrent = (currentProject === i);
            return (
            <li id={`project-${i}`} key={p['id']} className="list-group-item project-li" role="button">
                <div id={`project-${i}-header`} className='d-flex flex-row justify-content-between project-li-header' onClick={() => selectCurrentProject(i)}>
                    <h6>{p['name']}</h6>
                    <ChevronDown style={{
                        transform: isCurrent ? 'scale(1, -1)' : 'inherit'
                    }}></ChevronDown>
                </div>
                <div id={`project-${i}-body`} className='project-li-body'>
                    <Collapse isOpen={isCurrent}>
                        {p['description']}
                    </Collapse>
                </div>
            </li>
            );
        });

        return (
            <div>
            <div className="project-list">
                <div className="project-list-header d-flex justify-content-between">
                    <div>
                        <Input placeholder='Search...' value={projectListSearch} onChange={(e) => setProjectListSearch(e.target.value)}></Input>
                    </div>
                    <div>
                        <Button color="primary" onClick={() => setIsCreateModalOpen(true)}>Create</Button>
                    </div>
                </div>
                <ul className="list-group flush project-list-body">
                    {renderedProjects}
                </ul>
            </div>
            <CreateProjectModal isOpen={isCreateModalOpen} setIsOpen={setIsCreateModalOpen}></CreateProjectModal>
            </div>
        );
    }

    function renderJobs() {
        return (
            <div>There should be jobs here.</div>
        );
    }

    function renderTabList() {
        return (
            <div className="nav nav-tabs">
                <span
                    className={(currentTab === Tabs.Projects) ? "nav-link active" : "nav-link"}
                    onClick={() => setCurrentTab(Tabs.Projects)}
                >
                    Projects
                </span>

                <span
                    className={(currentTab === Tabs.Jobs) ? "nav-link active" : "nav-link"}
                    onClick={() => setCurrentTab(Tabs.Jobs)}
                >
                    Jobs
                </span>
            </div>
        )
    }

    function renderTab() {
        switch (currentTab) {
            case Tabs.Projects: {
                return renderProjects();
            }
            case Tabs.Jobs: {
                return renderJobs();
            }
        }
    }

    return (
        <div className="container p-2">
            <div className="row h-100">
                <div className="col-md-6 col-sm-10 mx-auto p-0">
                    <div className="card p-3">
                        {renderTabList()}
                        <div className="p-2">
                            {renderTab()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}