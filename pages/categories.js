// import Layout from "@/components/Layout";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { withSwal } from "react-sweetalert2";
// import { v4 as uuidv4 } from "uuid";

// function Categories({ swal }) {
// 	const [editedCategory, setEditedCategory] = useState(null);
// 	const [name, setName] = useState("");
// 	const [parentCategory, setParentCategory] = useState("");
// 	const [categories, setCategories] = useState([]);
// 	const [properties, setProperties] = useState([]);

// 	useEffect(() => {
// 		fetchCategories();
// 	}, []);

// 	function fetchCategories() {
// 		axios.get("/api/categories").then((result) => {
// 			setCategories(result.data);
// 		});
// 	}

// 	async function saveCategory(ev) {
// 		ev.preventDefault();
// 		const data = {
// 			name,
// 			parentCategory,
// 			properties: properties.map((p) => ({
// 				name: p.name,
// 				values: p.values.split(","),
// 			})),
// 		};
// 		if (editedCategory) {
// 			data._id = editedCategory._id;
// 			await axios.put("/api/categories", data);
// 			setEditedCategory(null);
// 		} else {
// 			await axios.post("/api/categories", data);
// 		}
// 		setName("");
// 		setParentCategory("");
// 		setProperties([]);
// 		fetchCategories();
// 	}

// 	function editCategory(category) {
// 		setEditedCategory(category);
// 		setName(category.name);
// 		setParentCategory(category.parent?._id);
// 		setProperties(
// 			category.properties.map(({ name, values }) => ({
// 				name,
// 				values: values.join(","),
// 			}))
// 		);
// 	}

// 	function deleteCategory(category) {
// 		swal
// 			.fire({
// 				title: "Êtes-vous sûr ?",
// 				text: `Voulez-vous supprimer : ${category.name}?`,
// 				showCancelButton: true,
// 				cancelButtonText: "Annuler",
// 				confirmButtonText: "Oui, Supprimer !",
// 				confirmButtonColor: "#d55",
// 				reverseButtons: true,
// 			})
// 			.then(async (result) => {
// 				if (result.isConfirmed) {
// 					const { _id } = category;
// 					await axios.delete("/api/categories?_id=" + _id);
// 					fetchCategories();
// 				}
// 			});
// 	}
// 	function addProperty() {
// 		setProperties((prev) => {
// 			console.log(prev);
// 			return [
// 				...prev,
// 				{ id: uuidv4(), name: "", values: "" }, // Generate unique ID using uuidv4()
// 			];
// 		});
// 	}
// 	function handlePropertyNameChange(index, property, newName) {
// 		setProperties((prev) => {
// 			const properties = [...prev];
// 			properties[index].name = newName;
// 			return properties;
// 		});
// 	}
// 	function handlePropertyValuesChange(index, property, newValues) {
// 		setProperties((prev) => {
// 			const properties = [...prev];
// 			properties[index].values = newValues;
// 			return properties;
// 		});
// 	}
// 	function removeProperty(indexToRemove) {
// 		setProperties((prev) => {
// 			return [...prev].filter((p, pIndex) => {
// 				return pIndex !== indexToRemove;
// 			});
// 		});
// 	}
// 	return (
// 		<Layout>
// 			<h1>Categories</h1>
// 			<label>
// 				{editedCategory
// 					? `Editer la catégorie : ${editedCategory.name}`
// 					: "Créer la nouvelle catégorie"}
// 			</label>
// 			<form onSubmit={saveCategory}>
// 				<div className="flex gap-1">
// 					<input
// 						type="text"
// 						placeholder={"Nom de la catégorie"}
// 						onChange={(ev) => setName(ev.target.value)}
// 						value={name}
// 					/>
// 					<select
// 						onChange={(ev) => setParentCategory(ev.target.value)}
// 						value={parentCategory}
// 					>
// 						<option value="">Aucune catégorie parente</option>
// 						{categories.length > 0 &&
// 							categories.map((category) => (
// 								<option key={category._id} value={category._id}>
// 									{category.name}
// 								</option>
// 							))}
// 					</select>
// 				</div>
// 				<div className="mb-2">
// 					<label className="block">Mots clés</label>
// 					<button
// 						onClick={addProperty}
// 						type="button"
// 						className="mb-2 text-sm btn-default"
// 					>
// 						Ajouter de nouveau mots clés
// 					</button>
// 					{properties.length > 0 &&
// 						properties.map((property, index) => (
// 							<div key={property.id} className="flex gap-1 mb-2">
// 								<input
// 									type="text"
// 									value={property.name}
// 									className="mb-0"
// 									autoFocus="autoFocus"
// 									onChange={(ev) =>
// 										handlePropertyNameChange(index, property, ev.target.value)
// 									}
// 									placeholder="Mot clé (ex : couleur)"
// 								/>
// 								<input
// 									type="text"
// 									className="mb-0"
// 									onChange={(ev) =>
// 										handlePropertyValuesChange(index, property, ev.target.value)
// 									}
// 									value={property.values}
// 									placeholder="valeurs, séparées par des virgules"
// 								/>
// 								<button
// 									onClick={() => removeProperty(index)}
// 									type="button"
// 									className="btn-red"
// 								>
// 									Supprimer
// 								</button>
// 							</div>
// 						))}
// 				</div>
// 				<div className="flex gap-1">
// 					{editedCategory && (
// 						<button
// 							type="button"
// 							onClick={() => {
// 								setEditedCategory(null);
// 								setName("");
// 								setParentCategory("");
// 								setProperties([]);
// 							}}
// 							className="btn-default"
// 						>
// 							Annuler
// 						</button>
// 					)}
// 					<button type="submit" className="py-1 btn-primary">
// 						Sauvegarder
// 					</button>
// 				</div>
// 			</form>
// 			{!editedCategory && (
// 				<table className="mt-4 basic">
// 					<thead>
// 						<tr>
// 							<td>Nom de la catégorie</td>
// 							<td>Catégorie parente</td>
// 							<td></td>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{categories.length > 0 &&
// 							categories.map((category) => (
// 								<tr key={category._id}>
// 									<td>{category.name}</td>
// 									<td>{category?.parent?.name}</td>
// 									<td>
// 										<button
// 											onClick={() => editCategory(category)}
// 											className="mr-1 btn-default"
// 										>
// 											Editer
// 										</button>
// 										<button
// 											onClick={() => deleteCategory(category)}
// 											className="btn-red"
// 										>
// 											Supprimer
// 										</button>
// 									</td>
// 								</tr>
// 							))}
// 					</tbody>
// 				</table>
// 			)}
// 		</Layout>
// 	);
// }

// export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

function Categories() {
	const [editedCategory, setEditedCategory] = useState(null);
	const [name, setName] = useState("");
	const [parentCategory, setParentCategory] = useState("");
	const [categories, setCategories] = useState([]);
	const [properties, setProperties] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		axios.get("/api/categories").then((result) => {
			setCategories(result.data);
		});
	}

	async function saveCategory(ev) {
		ev.preventDefault();
		const data = {
			name,
			parentCategory,
			properties: properties.map((p) => ({
				name: p.name,
				values: p.values.split(","),
			})),
		};
		if (editedCategory) {
			data._id = editedCategory._id;
			await axios.put("/api/categories", data);
			setEditedCategory(null);
		} else {
			await axios.post("/api/categories", data);
		}
		setName("");
		setParentCategory("");
		setProperties([]);
		fetchCategories();
	}

	function editCategory(category) {
		setEditedCategory(category);
		setName(category.name);
		setParentCategory(category.parent?._id);
		setProperties(
			category.properties.map(({ name, values }) => ({
				name,
				values: values.join(","),
			}))
		);
	}

	function deleteCategory(category) {
		Swal.fire({
			title: "Êtes-vous sûr ?",
			text: `Voulez-vous supprimer : ${category.name}?`,
			showCancelButton: true,
			cancelButtonText: "Annuler",
			confirmButtonText: "Oui, Supprimer !",
			confirmButtonColor: "#d55",
			reverseButtons: true,
		}).then(async (result) => {
			if (result.isConfirmed) {
				const { _id } = category;
				await axios.delete("/api/categories?_id=" + _id);
				fetchCategories();
			}
		});
	}

	function addProperty() {
		setProperties((prev) => {
			console.log(prev);
			return [
				...prev,
				{ id: uuidv4(), name: "", values: "" }, // Generate unique ID using uuidv4()
			];
		});
	}

	function handlePropertyNameChange(index, property, newName) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].name = newName;
			return properties;
		});
	}

	function handlePropertyValuesChange(index, property, newValues) {
		setProperties((prev) => {
			const properties = [...prev];
			properties[index].values = newValues;
			return properties;
		});
	}

	function removeProperty(indexToRemove) {
		setProperties((prev) => {
			return [...prev].filter((p, pIndex) => {
				return pIndex !== indexToRemove;
			});
		});
	}

	return (
		<Layout>
			<h1>Categories</h1>
			<label>
				{editedCategory
					? `Editer la catégorie : ${editedCategory.name}`
					: "Créer la nouvelle catégorie"}
			</label>
			<form onSubmit={saveCategory}>
				<div className="flex gap-1">
					<input
						type="text"
						placeholder={"Nom de la catégorie"}
						onChange={(ev) => setName(ev.target.value)}
						value={name}
					/>
					<select
						onChange={(ev) => setParentCategory(ev.target.value)}
						value={parentCategory}
					>
						<option value="">Aucune catégorie parente</option>
						{categories.length > 0 &&
							categories.map((category) => (
								<option key={category._id} value={category._id}>
									{category.name}
								</option>
							))}
					</select>
				</div>
				<div className="mb-2">
					<label className="block">Mots clés</label>
					<button
						onClick={addProperty}
						type="button"
						className="mb-2 text-sm btn-default"
					>
						Ajouter de nouveau mots clés
					</button>
					{properties.length > 0 &&
						properties.map((property, index) => (
							<div key={property.id} className="flex gap-1 mb-2">
								<input
									type="text"
									value={property.name}
									className="mb-0"
									autoFocus="autoFocus"
									onChange={(ev) =>
										handlePropertyNameChange(index, property, ev.target.value)
									}
									placeholder="Mot clé (ex : couleur)"
								/>
								<input
									type="text"
									className="mb-0"
									onChange={(ev) =>
										handlePropertyValuesChange(index, property, ev.target.value)
									}
									value={property.values}
									placeholder="valeurs, séparées par des virgules"
								/>
								<button
									onClick={() => removeProperty(index)}
									type="button"
									className="btn-red"
								>
									Supprimer
								</button>
							</div>
						))}
				</div>
				<div className="flex gap-1">
					{editedCategory && (
						<button
							type="button"
							onClick={() => {
								setEditedCategory(null);
								setName("");
								setParentCategory("");
								setProperties([]);
							}}
							className="btn-default"
						>
							Annuler
						</button>
					)}
					<button type="submit" className="py-1 btn-primary">
						Sauvegarder
					</button>
				</div>
			</form>
			{!editedCategory && (
				<table className="mt-4 basic">
					<thead>
						<tr>
							<td>Nom de la catégorie</td>
							<td>Catégorie parente</td>
							<td></td>
						</tr>
					</thead>
					<tbody>
						{categories.length > 0 &&
							categories.map((category) => (
								<tr key={category._id}>
									<td>{category.name}</td>
									<td>{category?.parent?.name}</td>
									<td>
										<button
											onClick={() => editCategory(category)}
											className="mr-1 btn-default"
										>
											Editer
										</button>
										<button
											onClick={() => deleteCategory(category)}
											className="btn-red"
										>
											Supprimer
										</button>
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
		</Layout>
	);
}

export default Categories;
