const dataContainer = document.getElementById("dataContainer"); // ตรวจสอบว่ามี container
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response => response.json())
    .then(data => {
        data.forEach(post => {
            // สร้าง block card สำหรับแต่ละโพสต์
            const postCard = document.createElement("div");
            postCard.style.border = "1px solid #ccc";
            postCard.style.borderRadius = "8px";
            postCard.style.padding = "16px";
            postCard.style.margin = "16px 0";
            postCard.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
            postCard.style.backgroundColor = "#f9f9f9";

            // เพิ่มเนื้อหาใน block card
            postCard.innerHTML = `
                <h3 style="margin: 0; color: #333;">Post ID: ${post.id}</h3>
                <h4 style="margin: 8px 0; color: #007BFF;">${post.title}</h4>
                <p style="margin: 0; color: #555;">${post.body}</p>
            `;

            // เพิ่ม block card เข้าใน container
            dataContainer.appendChild(postCard);
        });
    })
    .catch(error => {
        console.error("Error fetching posts:", error);
    });
