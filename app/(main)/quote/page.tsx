"use client";

import { Loader } from "@/components/loader"
import Image from 'next/image'
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/lib/route"



const QuotePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handleSubmit();
		}
	};

	// main
	const handleSubmit = () => {
		setShowMessage(true);
		setIsLoading(true)

		axios.get(`${BASE_URL}/api/quote`)
			.then(response => {
				setIsLoading(false);

				const data = response.data
				const botMessage = { content: data.content, author: data.author, author_image: `data:image/png;base64, ${data.author_image}` };
				setMessages([...messages, botMessage]);
			})
			.catch(error => {
				console.error('Error:', error);
				setIsLoading(false);
				setShowMessage(false);
			});


		setMessage('');

	};


	return (
		<>
			{isLoading && (
				<div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
					<Loader />
				</div>
			)}
			<div className="flex flex-col flex-grow overflow-auto">
				<div className="flex px-4 py-3">
					<div className="h-10 w-10 rounded flex-shrink-0 bg-gray-300">
						<div className="w-10 h-10 relative">
							<Image src="/bot.png" alt="Sam" className="h-6 w-6 rounded-full" fill />
						</div>
					</div>
					<div className="ml-2">
						<div className="-mt-1 flex items-center">
							<span className="text-sm font-semibold">BOT</span>

						</div>
						<p className="text-sm">I will generate a random quote along with an image of the quotes author.</p>
						<div className="flex space-x-2 mt-1">
							<button className="flex items-center pl-1 pr-2 h-5 bg-gray-300 hover:bg-gray-400 rounded-full text-xs">
								<span>🔥</span>
								<span className="ml-1 font-medium">2</span>
							</button>
						</div>
					</div>
				</div>


				<div className="flex flex-col items-center mt-2">

				</div>


				{showMessage && messages.map((msg, index) => (
					<div key={index} className="flex px-4 py-3">
						<div className="w-10 h-10 relative">
							<Image src="/user.png" alt="user" className="h-6 w-6 rounded-full" fill />
						</div>
						<div className="ml-2 flex-grow">
							<div className="-mt-1">
								<span className="text-sm font-semibold">User</span>
							</div>
							<p className="text-sm">{msg.content} - {msg.author}</p>
						</div>
						<div className="ml-2 flex-shrink-0">
							<img src={msg.author_image} alt="Image" className="h-80 w-80 rounded-sm" />
						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x ">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<button disabled={isLoading} value={message} onKeyDown={handleKeyDown} onClick={handleSubmit} onChange={(e) => setMessage(e.target.value)} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1 bg-violet-500" style={{ resize: 'none' }}>
						Send
					</button>

				</div>
			</div>
		</>
	);
};

export default QuotePage;
