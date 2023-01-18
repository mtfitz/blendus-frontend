import React, { useState, useEffect } from 'react';
import supabase from '../supabase';
import { Database } from '../supabase.types';
import { Collapse, List, UncontrolledCollapse } from 'reactstrap';

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

interface Job {
    id: string,
    projectName: string,
    dateStarted: string,
    dateFinished?: string,
    progressPercentage: number,
}

type Project = Database['public']['Tables']['projects']['Row'];

export default function Home() {
    const [currentTab, setCurrentTab] = useState<Tabs>(Tabs.Projects);
    const [projects, setProjects] = useState<Project[]>([]);
    const [jobs, setJobs] = useState<Array<Job>>([]);
    //const [selectedProject, setSelectedProject] = useState(-1);

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

    /*function handleFocusChange(i: number) {
        if (i === selectedProject) {
            setSelectedProject(-1);
        } else {
            setSelectedProject(i);
        }
    }*/

    function renderProjects() {
        const renderedProjects = projects.map((p, i) => (
            <li key={p['id']} className="list-group-item d-flex" role="button">
                <div>
                    {p['name']}
                </div>
                <div>
                    <UncontrolledCollapse toggler={this}>
                        {p['description']}
                    </UncontrolledCollapse>
                </div>
            </li>
        ));

        return (
            <ul className="list-group flush">
                {renderedProjects}
            </ul>
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