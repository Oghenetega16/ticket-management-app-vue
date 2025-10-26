<template>
    <div class="relative overflow-hidden">
        <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path 
                fill="#4F46E5" 
                fill-opacity="0.1" 
                d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,144C960,149,1056,139,1152,128C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            />
        </svg>
        
        <div class="absolute top-20 right-20 w-64 h-64 bg-indigo-300 rounded-full opacity-20 blur-3xl"></div>
        <div class="absolute bottom-40 left-10 w-96 h-96 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 py-20">
            <div class="text-center space-y-8">
                <h1 class="text-6xl font-bold text-gray-900">TicketFlow</h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Streamline your support workflow with our powerful ticket management system. 
                    Track, manage, and resolve tickets efficiently.
                </p>
                <div class="flex gap-4 justify-center flex-wrap">
                    <button 
                        @click="$router.push('/login')" 
                        class="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition transform hover:scale-105"
                    >
                        Login
                    </button>
                    <button 
                        @click="$router.push('/signup')" 
                        class="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition transform hover:scale-105"
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    transition: all 0.3s ease;
}
</style>
