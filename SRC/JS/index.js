document.addEventListener("DOMContentLoaded", function () {
	
	const form = document.querySelector(".form-group");
	const description = document.getElementById("description");
	const htmlCode = document.getElementById("html-code");
	const cssCode = document.getElementById("css-code");
	const preview = document.getElementById("preview-section");

	function setLoading(isLoading) {
		const button = document.getElementById("generate-btn");
		if (isLoading) {
			button.innerHTML = "Gerando Background...";
		} else {
			button.innerHTML = "Gerando Background Mágico";
		}
	}

	function applyGeneratePreview(html, css) {
		htmlCode.textContent = html;
		cssCode.textContent = css;

		preview.style.display = "block";
		preview.innerHTML = html;

		const existingStyle = document.getElementById("dynamic-style");
		if (existingStyle) {
			existingStyle.remove();
		}

		if (css) {
			const style = document.createElement("style");
			style.id = "dynamic-style";
			style.textContent = css;
			document.head.appendChild(style);
		}
	}

	form.addEventListener("submit", async function (event) {
		event.preventDefault();

		const descriptionValue = description.value.trim();

		if (!descriptionValue) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(" colocar n8n", { //lembrar de tirar n8n pra suber no github  
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ descriptionValue }),
			});

			const data = await response.json();

			const html = data.html || "Nenhum código HTML retornado.";
			const css = data.css || "Nenhum código CSS retornado.";

			applyGeneratePreview(html, css);
		} catch (error) {
			console.error("Erro ao gerar o background:", error);
			htmlCode.textContent = "Erro ao gerar o HTML.";
			cssCode.textContent = "Erro ao gerar o CSS.";
			preview.innerHTML = "";
		} finally {
			setLoading(false);
		}
	});
});
// Crie uma animação de background gradiente que muda do azul claro para o azul escuro