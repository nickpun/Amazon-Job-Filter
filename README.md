# Amazon-Job-Filter
Filter the Vancouver Amazon job listings by my qualifications

Both userscripts designed to be run on Tampermonkey

Amazon Job List Script
- opens all the job listings

Amazon Job Description Script
- searches an opened job listing for keywords that would void my qualification for that role
- saves the job if I'm qualified with the format:
    - filename: (id)
    - data: (title) + "\n" + (link)
