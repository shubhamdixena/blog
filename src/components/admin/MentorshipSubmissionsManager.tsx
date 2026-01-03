import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Eye, 
  Mail, 
  Phone, 
  MapPin, 
  School, 
  Calendar,
  User,
  FileText,
  Accessibility
} from "lucide-react";

interface MentorshipSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  whatsapp: string | null;
  city: string | null;
  application_type: string;
  professional_status: string;
  institution: string | null;
  background_info: string[] | null;
  has_accessibility_needs: boolean | null;
  communication_preference: string | null;
  session_timing: string | null;
  accessibility_requirements: string | null;
  agree_to_terms: boolean | null;
  files_uploaded: string[] | null;
  created_at: string;
  updated_at: string | null;
}

interface MentorshipSubmissionsManagerProps {
  activeTab?: string;
}

export function MentorshipSubmissionsManager({ activeTab }: MentorshipSubmissionsManagerProps) {
  const [submissions, setSubmissions] = useState<MentorshipSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<MentorshipSubmission | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (activeTab === "mentorship") {
      fetchSubmissions();
    }
  }, [activeTab]);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('mentorship_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching submissions:', error);
        toast({
          title: "Error",
          description: "Failed to load mentorship submissions.",
          variant: "destructive",
        });
        return;
      }

      setSubmissions(data || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load mentorship submissions.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getApplicationTypeBadge = (type: string) => {
    const colors = {
      'undergraduate': 'bg-blue-100 text-blue-800',
      'graduate': 'bg-green-100 text-green-800',
      'phd': 'bg-purple-100 text-purple-800',
      'career': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const openDetails = (submission: MentorshipSubmission) => {
    setSelectedSubmission(submission);
    setDetailsOpen(true);
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="text-sm text-gray-500">Loading submissions...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Mentorship Applications ({submissions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No mentorship applications yet.
            </div>
          ) : (
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200 bg-gray-50">
                    <TableHead className="border-r border-gray-200 font-semibold">Name</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Email</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">WhatsApp</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">City</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Institution</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Type</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Status</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Accessibility</TableHead>
                    <TableHead className="border-r border-gray-200 font-semibold">Submitted</TableHead>
                    <TableHead className="w-20 font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((submission) => (
                    <TableRow key={submission.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <TableCell className="font-medium border-r border-gray-200">
                        {submission.first_name} {submission.last_name}
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span className="text-sm">{submission.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        {submission.whatsapp ? (
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-green-500" />
                            <span className="text-sm">{submission.whatsapp}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        {submission.city ? (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{submission.city}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        {submission.institution ? (
                          <div className="flex items-center gap-1">
                            <School className="w-3 h-3 text-gray-400" />
                            <span className="text-sm">{submission.institution}</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        <Badge className={getApplicationTypeBadge(submission.application_type)}>
                          {submission.application_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        <Badge variant="outline">
                          {submission.professional_status}
                        </Badge>
                      </TableCell>
                      <TableCell className="border-r border-gray-200">
                        {submission.has_accessibility_needs ? (
                          <Badge className="bg-yellow-100 text-yellow-800">
                            <Accessibility className="w-3 h-3 mr-1" />
                            Yes
                          </Badge>
                        ) : (
                          <span className="text-gray-400">No</span>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500 border-r border-gray-200">
                        {formatDate(submission.created_at)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openDetails(submission)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Application Details - {selectedSubmission?.first_name} {selectedSubmission?.last_name}
            </DialogTitle>
          </DialogHeader>
          
          {selectedSubmission && (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Full Name</label>
                      <p className="text-sm">{selectedSubmission.first_name} {selectedSubmission.last_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Email</label>
                      <p className="text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {selectedSubmission.email}
                      </p>
                    </div>
                    {selectedSubmission.phone && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {selectedSubmission.phone}
                        </p>
                      </div>
                    )}
                    {selectedSubmission.whatsapp && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">WhatsApp</label>
                        <p className="text-sm flex items-center gap-1">
                          <Phone className="w-3 h-3 text-green-500" />
                          {selectedSubmission.whatsapp}
                        </p>
                      </div>
                    )}
                    {selectedSubmission.city && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">City</label>
                        <p className="text-sm flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selectedSubmission.city}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <School className="w-4 h-4" />
                      Academic Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Application Type</label>
                      <div className="mt-1">
                        <Badge className={getApplicationTypeBadge(selectedSubmission.application_type)}>
                          {selectedSubmission.application_type}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Professional Status</label>
                      <p className="text-sm">{selectedSubmission.professional_status}</p>
                    </div>
                    {selectedSubmission.institution && (
                      <div>
                        <label className="text-sm font-medium text-gray-600">Institution</label>
                        <p className="text-sm">{selectedSubmission.institution}</p>
                      </div>
                    )}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Submitted</label>
                      <p className="text-sm flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(selectedSubmission.created_at)}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Background Information */}
              {selectedSubmission.background_info && selectedSubmission.background_info.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Background Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedSubmission.background_info.map((item, index) => (
                        <Badge key={index} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Accessibility & Preferences */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Accessibility className="w-4 h-4" />
                    Accessibility & Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Has Accessibility Needs</label>
                    <p className="text-sm">
                      {selectedSubmission.has_accessibility_needs ? (
                        <Badge className="bg-yellow-100 text-yellow-800">Yes</Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </p>
                  </div>
                  {selectedSubmission.communication_preference && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Communication Preference</label>
                      <p className="text-sm">{selectedSubmission.communication_preference}</p>
                    </div>
                  )}
                  {selectedSubmission.session_timing && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Session Timing</label>
                      <p className="text-sm">{selectedSubmission.session_timing}</p>
                    </div>
                  )}
                  {selectedSubmission.accessibility_requirements && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Accessibility Requirements</label>
                      <p className="text-sm bg-gray-50 p-3 rounded">{selectedSubmission.accessibility_requirements}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Files */}
              {selectedSubmission.files_uploaded && selectedSubmission.files_uploaded.length > 0 && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Uploaded Files
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedSubmission.files_uploaded.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{file}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
