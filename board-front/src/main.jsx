import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Modal from "react-modal";
Modal.setAppElement("#root");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1
    },
    mutations: {
      retry: 1
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>,
)