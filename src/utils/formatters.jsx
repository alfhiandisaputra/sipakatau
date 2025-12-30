// src/utils/formatters.js
export const formatPoints = (points) => {
  return points.toLocaleString('id-ID');
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatAnswer = (answer) => {
  return answer.split('\n').map((line, index) => {
    if (line.startsWith('•') || line.startsWith('✓')) {
      return (
        <div key={index} className="flex items-start gap-2 mb-1">
          <span className="mt-1 text-emerald-500">{line.charAt(0)}</span>
          <span>{line.substring(1)}</span>
        </div>
      );
    } else if (line.match(/^\d+\./)) {
      return (
        <div key={index} className="flex items-start gap-2 mb-2">
          <span className="font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
            {line.split('.')[0]}.
          </span>
          <span className="text-gray-700">{line.substring(line.indexOf('.') + 1)}</span>
        </div>
      );
    }
    return <p key={index} className="mb-2">{line}</p>;
  });
};

export const formatContactInfo = (type, value) => {
  switch(type) {
    case 'email':
      return `mailto:${value}`;
    case 'whatsapp':
      return `https://wa.me/${value}`;
    case 'phone':
      return `tel:${value}`;
    default:
      return value;
  }
};