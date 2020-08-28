import React, { useEffect, useState } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
	const [repositories, setRepositories] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await api.get("repositories");
			setRepositories(response.data);
		}

		fetchData();
	}, []);

	async function handleAddRepository() {
		const response = await api.post("repositories", {
			title: `New repository ${Date.now()}`,
			techs: [],
		});

		setRepositories([...repositories, response.data]);
	}

	async function handleRemoveRepository(repositoryId) {
		const remainingRepositories = repositories.filter(
			(repository) => repository.id !== repositoryId
		);
		await api.delete(`repositories/${repositoryId}`);
		setRepositories(remainingRepositories);
	}

	return (
		<div>
			<ul data-testid="repository-list">
				{repositories.map((repository) => (
					<li key={repository.id}>
						{repository.title}
						<button
							onClick={() =>
								handleRemoveRepository(repository.id)
							}
						>
							Remover
						</button>
					</li>
				))}
			</ul>

			<button onClick={handleAddRepository}>Adicionar</button>
		</div>
	);
}

export default App;
