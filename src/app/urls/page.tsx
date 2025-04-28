import Link from "next/link";



async function fetchUrls(){
    console.log(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
        cache: 'force-cache'
    });
    if (!response.ok) {
        throw new Error('Failed to fetch urls');
    }
    return response.json();
}

export default async function UrlList() {
    let urls;
    try {
        urls = await fetchUrls();
        console.log(urls)
    } catch (error) {
        console.error('Error fetching urls:', error);
        return(
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="p-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full">
                    <h1 className="font-bold text-3xl mg-6 text-center text-gray-700">Error</h1>
                    <p className="text-center text-red-500">Failed to load urls</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="p-10 bg-gray-100 rounded-lg shadow-2xl max-w-4xl w-full">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-700 ">All Short Urls</h1>
                <a href="/" className="text-white font-medium rounded-lg text-md px-2 py-2 dark:bg-green-600 dark:hover:bg-green-700">Go To Home</a>

                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full" >
                        <thead >
                            <tr className="text-black ">
                                <th>
                                    Original URL
                                </th>
                                <th>
                                    Short URL
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {urls.urls && urls.urls.map((url: {_id: string, originalUrl: string, shortUrl: string}) => {
                                return (
                                    <tr key={url._id}>
                                        <td className="text-primary link-hover">{url.originalUrl}</td>
                                        <td >
                                            <a 
                                                href={`/${url.shortUrl}`} 
                                                target="_blank"
                                                // className="text-blue-500 hover:underline"
                                                className="link link-primary"
                                            >
                                                {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`}
                                            </a>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}