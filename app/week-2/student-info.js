import Link from "next/link";

let repo = 'https://github.com/glconde/cprg306-assignments';

//StudentInfo component
function StudentInfo() { 
    return (
        <div>
            <h1>George Louie Conde</h1>
            <p>
            <Link 
                href={repo}
                className="text-blue-500 hover:text-blue-700 underline"
                > My Github Repository 
            </Link>
            </p>
        </div>
    );
}

export default StudentInfo;