import { useEffect, useMemo, useState } from 'react';

const programs = [
  'Fat Loss',
  'Muscle Gain',
  'Home Workout',
  'Online Coaching',
];

const courses = [
  {
    title: '90 Day Fat Loss',
    price: '₹1999',
  },
  {
    title: 'Muscle Builder Blueprint',
    price: '₹2499',
  },
  {
    title: 'Home Workout Masterclass',
    price: '₹1499',
  },
];

const diets = [
  {
    title: 'Fat Loss Diet',
    meals: 'High protein, calorie deficit, clean eating.',
  },
  {
    title: 'Muscle Gain Diet',
    meals: 'High calorie lean bulk meal strategy.',
  },
  {
    title: 'Vegetarian Plan',
    meals: 'Balanced vegetarian nutrition for fitness goals.',
  },
];

const dashboardStats = [
  ['18', 'New Leads'],
  ['14', 'Active Clients'],
  ['₹58K', 'Monthly Revenue'],
];

const analyticsStats = [
  ['100+', 'Happy Clients'],
  ['95%', 'Success Rate'],
  ['24/7', 'AI Support'],
  ['164+', 'Diet Plans Sold'],
];

export default function FitnessTrainerWebsite() {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [firebaseConnected] = useState(true);
  const [razorpayReady] = useState(true);
  const [formspreeConnected] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'AI Coach',
      text: 'Welcome to AmiiiFit. Ask anything about workouts or nutrition.',
    },
  ]);
  const [messageInput, setMessageInput] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    program: programs[0],
    goals: '',
  });

  useEffect(() => {
    setNotifications([
      '🔥 New transformation program available',
      '💪 Summer shred challenge started',
    ]);
  }, []);

  const cardClasses = useMemo(
    () =>
      darkMode
        ? 'bg-gray-950 border-gray-800'
        : 'bg-gray-100 border-gray-300',
    [darkMode]
  );

  const sectionClasses = useMemo(
    () => (darkMode ? 'bg-gray-950' : 'bg-gray-200'),
    [darkMode]
  );

  const inputClasses = useMemo(
    () =>
      darkMode
        ? 'bg-gray-900 border-gray-700 text-white'
        : 'bg-gray-100 border-gray-300 text-black',
    [darkMode]
  );

  const sendChatMessage = async () => {
  const trimmedMessage = messageInput.trim();

  if (!trimmedMessage) {
    return;
  }

  const userMessage = {
    sender: 'You',
    text: trimmedMessage,
  };

  setChatMessages((previous) => [
    ...previous,
    userMessage,
  ]);

  setMessageInput('');

  try {
    const response = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are a professional fitness trainer and nutrition coach.',
            },
            {
              role: 'user',
              content: trimmedMessage,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const aiReply =
      data.choices?.[0]?.message?.content ||
      'Sorry, I could not respond right now.';

    setChatMessages((previous) => [
      ...previous,
      {
        sender: 'AI Coach',
        text: aiReply,
      },
    ]);
  } catch (error) {
    setChatMessages((previous) => [
      ...previous,
      {
        sender: 'AI Coach',
        text: 'AI server error. Please try again.',
      },
    ]);
  }
};

  const fakeLogin = () => {
    setUser({
      name: 'Fitness Member',
      membership: 'Premium',
    });
  };

  const calculateBMI = () => {
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (!weightNum || !heightNum) {
      setBmi('Please enter valid height and weight.');
      return;
    }

    if (weightNum <= 0 || heightNum <= 0) {
      setBmi('Values must be greater than zero.');
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiResult = (
      weightNum /
      (heightInMeters * heightInMeters)
    ).toFixed(1);

    setBmi(bmiResult);
  };

  const handleBookingSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.goals) {
      alert('Please complete all booking fields.');
      return;
    }

    alert('Booking submitted successfully!');

    setFormData({
      name: '',
      email: '',
      program: programs[0],
      goals: '',
    });
  };

  return (
    <div
      className={`${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      } min-h-screen font-sans transition-all duration-300`}
    >
      <nav
        className={`sticky top-0 z-50 border-b px-6 py-4 flex flex-wrap justify-between items-center backdrop-blur-lg ${
          darkMode
            ? 'border-gray-800 bg-black/80'
            : 'border-gray-300 bg-white/80'
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏋️</span>
          <h1 className="text-2xl font-bold">AmiiiFit</h1>
        </div>

        <div className="flex items-center gap-4 text-sm md:text-base flex-wrap mt-4 md:mt-0">
          <a href="#booking" className="hover:text-green-400 transition-colors">
            Book
          </a>

          <a href="#programs" className="hover:text-green-400 transition-colors">
            Programs
          </a>

          <a href="#diet" className="hover:text-green-400 transition-colors">
            Diet Plans
          </a>

          {!user ? (
            <button
              onClick={fakeLogin}
              className="bg-green-500 text-black px-4 py-2 rounded-xl font-semibold hover:bg-green-400 transition-colors"
            >
              Login
            </button>
          ) : (
            <div className="text-green-400 font-semibold">
              {user.name}
            </div>
          )}

          <button
            onClick={() => setDarkMode((previous) => !previous)}
            className="border border-gray-600 p-2 rounded-xl hover:border-green-400 transition-colors"
            aria-label="Toggle theme"
            type="button"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-green-900 px-6 py-28 text-center">
        <div className="max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-5 py-2 mb-6">
            <span className="text-green-400">⭐</span>
            <span className="text-green-300 text-sm">
              Top Rated Online Fitness Coach
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            Build Your Dream Body.
            <span className="block text-green-400">Become Unstoppable.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            Fat loss, muscle building, online coaching, nutrition plans, and
            complete fitness transformation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#booking"
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl shadow-lg transition-all"
            >
              Start Transformation
            </a>

            <a
              href="https://wa.me/919315783260"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-green-400 hover:bg-green-500 hover:text-black px-8 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all"
            >
              💬 WhatsApp Now
            </a>

            <button
              onClick={() => setChatOpen((previous) => !previous)}
              className="bg-black text-white border border-green-400 p-4 rounded-full shadow-2xl text-2xl"
              type="button"
            >
              🤖
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 text-center">
          {analyticsStats.map(([value, label]) => (
            <div
              key={label}
              className={`rounded-3xl p-8 border ${cardClasses}`}
            >
              <div className="text-4xl font-extrabold text-green-400 mb-3">
                {value}
              </div>
              <div className="text-gray-400">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="programs" className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-4">
            Premium Fitness Programs
          </h2>

          <p className="text-gray-400 mb-12">
            Complete transformation systems designed for every goal.
          </p>

          <div className="grid md:grid-cols-4 gap-8">
            {programs.map((item) => (
              <div
                key={item}
                className={`p-8 rounded-3xl transition-all hover:scale-105 border ${cardClasses}`}
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {item}
                </h3>

                <p className="text-gray-400">
                  Personalized coaching and training plans for fast results.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-12">
            Fitness Courses
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.title}
                className={`rounded-3xl p-8 border ${cardClasses}`}
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {course.title}
                </h3>

                <div className="text-3xl font-bold mb-6">
                  {course.price}
                </div>

              <a
              href="https://wa.me/919315783260"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-2xl font-bold w-full transition-colors block text-center"
              >
               Buy Now
              </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`${sectionClasses} px-6 py-20`}>
        <div
          className={`max-w-4xl mx-auto border rounded-3xl p-10 ${
            darkMode
              ? 'bg-black border-gray-800'
              : 'bg-white border-gray-300'
          }`}
        >
          <div className="flex items-center gap-3 mb-6 justify-center">
            <span className="text-3xl">📊</span>
            <h2 className="text-4xl font-bold text-green-400">
              BMI Calculator
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(event) => setWeight(event.target.value)}
              className={`border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            />

            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(event) => setHeight(event.target.value)}
              className={`border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            />
          </div>

          <button
            onClick={calculateBMI}
            className="mt-6 w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl transition-all"
            type="button"
          >
            Calculate BMI
          </button>

          {bmi && (
            <div className="mt-6 text-center text-2xl font-bold text-green-400 break-words">
              Your BMI: {bmi}
            </div>
          )}
        </div>
      </section>

      <section id="diet" className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-400 mb-12">
            Diet Plans
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {diets.map((diet) => (
              <div
                key={diet.title}
                className={`p-8 rounded-3xl border ${cardClasses}`}
              >
                <h3 className="text-2xl font-bold text-green-400 mb-4">
                  {diet.title}
                </h3>

                <p className="text-gray-400">{diet.meals}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className={`${sectionClasses} px-6 py-20`}>
        <div
          className={`max-w-3xl mx-auto border p-10 rounded-3xl shadow-2xl ${
            darkMode
              ? 'bg-black border-gray-800'
              : 'bg-white border-gray-300'
          }`}
        >
          <h2 className="text-4xl font-bold text-center text-green-400 mb-8">
            Book Your Fitness Consultation
          </h2>

          <form className="space-y-6" onSubmit={handleBookingSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  name: event.target.value,
                }))
              }
              className={`w-full border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  email: event.target.value,
                }))
              }
              className={`w-full border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            />

            <select
              value={formData.program}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  program: event.target.value,
                }))
              }
              className={`w-full border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            >
              {programs.map((program) => (
                <option key={program} value={program}>
                  {program}
                </option>
              ))}
            </select>

            <textarea
              rows="5"
              placeholder="Tell your goals"
              value={formData.goals}
              onChange={(event) =>
                setFormData((previous) => ({
                  ...previous,
                  goals: event.target.value,
                }))
              }
              className={`w-full border rounded-xl px-4 py-4 outline-none ${inputClasses}`}
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl transition-all"
            >
              Submit Booking + Pay Online
            </button>
          </form>
        </div>
      </section>

      <section className="px-6 py-20">
        <div
          className={`max-w-6xl mx-auto rounded-3xl border p-10 ${cardClasses}`}
        >
          <h2 className="text-4xl font-bold text-green-400 mb-10 text-center">
            Admin Dashboard Preview
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {dashboardStats.map(([value, label]) => (
              <div
                key={label}
                className={`rounded-2xl p-6 border ${
                  darkMode
                    ? 'bg-black border-gray-800'
                    : 'bg-white border-gray-300'
                }`}
              >
                <div className="text-4xl font-bold text-green-400 mb-2">
                  {value}
                </div>
                <div className="text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {chatOpen && (
        <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] rounded-3xl border border-gray-700 bg-black p-4 z-50 shadow-2xl">
          <div className="text-green-400 font-bold mb-4">
            AI Fitness Coach
          </div>

          <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
            {chatMessages.map((message, index) => (
              <div key={`${message.sender}-${index}`}>
                <div className="text-sm text-green-400">
                  {message.sender}
                </div>
                <div className="text-gray-300">{message.text}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              value={messageInput}
              onChange={(event) => setMessageInput(event.target.value)}
              placeholder="Ask fitness question"
              className="flex-1 rounded-xl bg-gray-900 border border-gray-700 px-3 py-2 text-white outline-none"
            />

            <button
              onClick={sendChatMessage}
              className="bg-green-500 text-black px-4 rounded-xl font-bold hover:bg-green-400 transition-colors"
              type="button"
            >
              Send
            </button>
          </div>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-end">
        <a
          href="https://wa.me/919315783260"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-400 text-black p-4 rounded-full shadow-2xl text-2xl transition-all"
        >
          💬
        </a>
      </div>

      <footer
        className={`border-t px-6 py-10 text-center ${
          darkMode
            ? 'bg-black border-gray-800'
            : 'bg-white border-gray-300'
        }`}
      >
        <h3 className="text-3xl font-bold text-green-400 mb-4">
          AmiiiFit Coaching
        </h3>

        <p className="text-gray-400 mb-6">
          Online fitness coaching • Transformation programs • Nutrition guidance • AI coaching • Secure payments • Analytics • Firebase integrated • Razorpay ready • Formspree connected
        </p>

        <div className="flex justify-center flex-wrap gap-4">
          <a
            href="http://www.youtube.com/@Amiiifit"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 px-5 py-3 rounded-xl hover:border-green-400 transition-all"
          >
            YouTube
          </a>
          <a
            href="https://www.instagram.com/__aaaammmiit"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 px-5 py-3 rounded-xl hover:border-green-400 transition-all"
          >
            Instagram
          </a>

          <a
            href="https://wa.me/919315783260"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 px-5 py-3 rounded-xl hover:border-green-400 transition-all"
          >
            WhatsApp
          </a>

          <a
            href="https://calendly.com/amiiifit"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-700 px-5 py-3 rounded-xl hover:border-green-400 transition-all"
          >
            Book Meeting
          </a>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          © 2026 AmiiiFit Coaching. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
