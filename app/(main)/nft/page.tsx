"use client";

import axios from "axios";
import { useState } from "react";

import { Loader } from "@/components/loader";
import Image from 'next/image'
import { BASE_URL } from "@/lib/route"


const NFTPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const [showMessage, setShowMessage] = useState(false);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault(); // Prevent the default form submission behavior
			handleSubmit(); // Call the handleSubmit function
		}
	};

	// main
	const handleSubmit = () => {
		setShowMessage(true);
		setIsLoading(true)

		axios.post(`${BASE_URL}/api/nft`, {content: message})
			.then(response => {
                setIsLoading(false);

                // Update the messages state if needed
                const userMessage = { content: message, sender: 'user' };
                const botMessage = { nft_image: `data:image/png;base64, ${response.data.nft_image}`, sender: 'bot' };
                setMessages([...messages, userMessage, botMessage]);
			})
			.catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
                setShowMessage(false);
            });


		setMessage('');
		
	};

	// Improve
	const handleButtonClick = () => {
		setIsLoading(true)

		axios.post(`${BASE_URL}/api/improve`, {content: message})
			.then(response => {
                setIsLoading(false);

                setMessage(response.data.content)
			})
			.catch(error => {
                console.error('Error:', error);
                setIsLoading(false);
            });


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
						<p className="text-sm">
							Have you ever admired an NFT or desired to own one consistently? I specialize in crafting high-quality NFTs tailored to your preferences<br></br>
							If you are unsure how to articulate your vision, dont worry! I offer a button that enhances your instructions effortlessly</p>
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
						<div className="ml-2">
							<div className="-mt-1">
								<span className="text-sm font-semibold">{msg.sender === 'user' ? 'User' : 'Bot'}</span>
							</div>
							{msg.sender === 'user' ? (
								<p className="text-sm">{msg.content}</p>
							) : (
								<div className="ml-2 flex-shrink-0">
									<img src={msg.nft_image} alt="Image" className="h-80 w-80 rounded-sm" />
								</div>
							)}
						</div>
					</div>
				))}

			</div>


			<div className="h-12 bg-white px-5 pb-4 text-x">
				<div className="flex items-center border-2 border-gray-300 rounded-sm p-1">
					<button disabled={isLoading} className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" onClick={handleButtonClick}>
						<svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
						</svg>
					</button>
					<input disabled={isLoading} value={message} onKeyDown={handleKeyDown} onChange={(e) => setMessage(e.target.value)} className="flex-grow text-sm px-3 border-l border-gray-300 ml-1" style={{ resize: 'none' }} placeholder="Message to bot"></input>


					<button disabled={isLoading} className="flex-shrink flex items-center justify-center h-6 w-6 rounded hover:bg-gray-200" onClick={handleSubmit}>
						<svg className="h-4 w-4 transform rotate-90" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
							<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
						</svg>
					</button>
				</div>
			</div>
		</>
	)
};

export default NFTPage;
