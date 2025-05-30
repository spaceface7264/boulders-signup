import { FormProvider } from './utils/FormContext'
import screens from './screens/index.js'
import React from "react"
import BouldersHeader from './components/BouldersHeader'
import Components from './components/index.js'

export default function App() {
	const screenName =
		new URLSearchParams(window.location.search).get('screen') || 'EmailEntry'

	const Screen =
		screenName in screens
			? screens[screenName as keyof typeof screens]
			: null

	const showProgress = ['PersonalInformation', 'MembershipSelection', 'LocationSelection', 'PaymentScreen'].includes(screenName);

	return (
		<FormProvider>
			<div className="relative min-h-screen flex flex-col">
				<BouldersHeader />
				{/* Main Content with padding for header */}
				<main className="flex-1 pt-10">
					{showProgress && <Components.ProgressSteps />}
					{Screen ? (
						<Screen />
					) : (
						<div className="flex items-center justify-center h-screen">
							<div className="flex flex-col gap-4">
								<div className="text-4xl font-bold border-b-2 border-gray-700">
									Project Screens
								</div>
								<div className="flex flex-col gap-2">
									{Object.keys(screens).map(screenName => (
										<a
											key={screenName}
											href={`/index.html?screen=${screenName}`}
											className="inline text-gray-300 transition-colors hover:text-[#ff00ff]"
										>
											{screenName}
										</a>
									))}
								</div>
							</div>
						</div>
					)}
				</main>
				{/* Footer */}
				<footer className="w-full bg-black/70 border-t border-gray-800 py-6 mt-auto text-center text-sm text-gray-400 z-10 relative">
					<div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
						<a href="https://boulders.dk/faq" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff00ff] transition-colors">FAQ</a>
						<a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff00ff] transition-colors">Terms & Conditions</a>
						<a href="#" className="hover:text-[#ff00ff] transition-colors">Privacy Policy</a>
						<a href="https://brp.boulders.dk" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff00ff] transition-colors">BRP Self Service Portal</a>
						<span className="hidden sm:inline-block border-l border-gray-700 h-4 mx-2"></span>
						<span className="flex flex-col sm:flex-row gap-1 sm:gap-3 items-center text-xs text-gray-400">
							<span>Contact: <a href="tel:72100019" className="hover:text-[#ff00ff] transition-colors">72 10 00 19</a></span>
							<span>|</span>
							<span>Email: <a href="mailto:hej@boulders.dk" className="hover:text-[#ff00ff] transition-colors">hej@boulders.dk</a></span>
						</span>
					</div>
				</footer>
				{/* Floating Help Button */}
				<a
					href="mailto:hej@boulders.dk"
					className="fixed bottom-6 right-6 z-50 bg-[#ff00ff] text-white rounded-full shadow-lg px-5 py-3 font-semibold flex items-center gap-2 hover:bg-[#e600e6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff00ff] focus:ring-offset-2"
					style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.25)' }}
					title="Need help? Contact us!"
				>
					<svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v2m18 0v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8m18 0l-9 6-9-6" />
					</svg>
					Help
				</a>
			</div>
		</FormProvider>
	)
}
